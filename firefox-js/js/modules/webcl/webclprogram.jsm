/*
 * This file is part of WebCL – Web Computing Language.
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL
 * was not distributed with this file, You can obtain
 * one at http://mozilla.org/MPL/2.0/.
 *
 * The Original Contributor of this Source Code Form is
 * Nokia Research Center Tampere (http://webcl.nokiaresearch.com).
 *
 */

var EXPORTED_SYMBOLS = [ "WebCLProgram" ];


try {

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

var Exception = Components.Exception;


Cu.import ("resource://gre/modules/Services.jsm");
Cu.import ("resource://gre/modules/XPCOMUtils.jsm");
Cu.import ("resource://nrcwebcl/modules/logger.jsm");
Cu.import ("resource://nrcwebcl/modules/webclutils.jsm");
Cu.import ("resource://nrcwebcl/modules/base.jsm");

Cu.import ("resource://nrcwebcl/modules/mixin.jsm");
Cu.import ("resource://nrcwebcl/modules/mixins/owner.jsm");

Cu.import ("resource://nrcwebcl/modules/lib_ocl/device.jsm");

Cu.import ("resource://nrcwebcl/modules/lib_ocl/ocl_constants.jsm");
Cu.import ("resource://nrcwebcl/modules/lib_ocl/ocl_exception.jsm");

Cu.import ("resource://nrcwebcl/modules/webclclasses.jsm");


function WebCLProgram ()
{
  TRACE (this, "WebCLProgram", arguments);
  try {
    if (!(this instanceof WebCLProgram)) return new WebCLProgram ();

    Base.apply(this);

    this.wrappedJSObject = this;

    this.buildOptions = "";

    this.kernelsAlreadyCreated = false;

    this._objectRegistry = {};

    this.__exposedProps__ =
    {
      getExternalIdentity: "r",
      getInfo: "r",
      getBuildInfo: "r",
      build: "r",
      createKernel: "r",
      createKernelsInProgram: "r",
      release: "r",

      classDescription: "r"
    };
  }
  catch (e)
  {
    ERROR ("webclprogram.jsm:WebCLProgram failed: " + e);
    throw webclutils.convertCLException (e);
  }
}

WEBCLCLASSES.WebCLProgram = WebCLProgram;
WebCLProgram.prototype = Object.create (Base.prototype);
addMixin (WebCLProgram.prototype, OwnerMixin);
WebCLProgram.prototype.classDescription = "WebCLProgram";



WebCLProgram.prototype.getInfo = function (name)
{
  TRACE (this, "getInfo", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateInteger(name))
      throw new INVALID_VALUE("'name' must be a valid CLenum; was ", name);

    switch (name)
    {
    case ocl_info.CL_PROGRAM_NUM_DEVICES:
    case ocl_info.CL_PROGRAM_SOURCE:
    case ocl_info.CL_PROGRAM_CONTEXT:
    case ocl_info.CL_PROGRAM_DEVICES:
      var clInfoItem = this._internal.getInfo (name);
      // Note: no need to acquire ownership
      return this._wrapInternal (clInfoItem);

    default:
      throw new INVALID_VALUE("'name' must be one of the accepted CLenums; was ", name);
    }
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLProgram.prototype.getBuildInfo = function (device, name)
{
  TRACE (this, "getBuildInfo", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateDevice(device))
      throw new INVALID_DEVICE("'device' must be a valid WebCLDevice; was ", device);

    if (!webclutils.validateInteger(name))
      throw new INVALID_VALUE("'name' must be a valid CLenum; was ", name);

    switch (name)
    {
    case ocl_info.CL_PROGRAM_BUILD_OPTIONS:
      return this.buildOptions;
    case ocl_info.CL_PROGRAM_BUILD_STATUS:
    case ocl_info.CL_PROGRAM_BUILD_LOG:
      var clDevice = this._unwrapInternalOrNull (device);
      var clInfoItem = this._internal.getBuildInfo (clDevice, name);
      // Note: no need to acquire ownership
      return this._wrapInternal (clInfoItem);

    default:
      throw new INVALID_VALUE("'name' must be one of the accepted CLenums; was ", name);
    }
  }
  catch (e)
  {
    /*
    let d = "device";
    try { d = device.getInfo(ocl_info.CL_DEVICE_NAME); } catch(e2){}
    try { let se = String(e); }catch(e2){}
    DEBUG("WebCLProgram.getBuildInfo("+d+","+oclInfoToString(name)+"): "+se);
    */

    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLProgram.prototype.build = function (devices, options, whenFinished)
{
  TRACE (this, "build", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  var validBuildOptions = [
    "-cl-opt-disable",
    "-cl-single-precision-constant",
    "-cl-denorms-are-zero",
    "-cl-mad-enable",
    "-cl-no-signed-zeros",
    "-cl-unsafe-math-optimizations",
    "-cl-finite-math-only",
    "-cl-fast-relaxed-math",
    "-w",
    "-Werror",
  ];

  devices = (devices === undefined) ? null : devices;
  options = (options === undefined) ? null : options;
  whenFinished = (whenFinished === undefined) ? null : whenFinished;

  try
  {
    if (this.kernelsAlreadyCreated === true)
      throw new INVALID_OPERATION("cannot build a WebCLProgram that has kernels already attached to it");

    if (devices !== null && (!Array.isArray(devices) || devices.length === 0))
      throw new INVALID_VALUE("'devices' must be null or an Array with at least one element; was ", devices);

    if (options !== null && typeof(options) !== 'string')
      throw new INVALID_BUILD_OPTIONS("'options' must be a string of valid build options or null; was ", options);

    if (options !== null && !webclutils.validateBuildOptions(options, validBuildOptions))
      throw new INVALID_BUILD_OPTIONS("'options' must be a string of valid build options or null; was ", options);

    if (whenFinished !== null && typeof(whenFinished) !== "function")
      throw new INVALID_VALUE("'whenFinished' must be null or a WebCLCallback function; was ", whenFinished);

    for (var i=0; devices !== null && i < devices.length; i++) {
      
      if (!webclutils.validateDevice(devices[i]))
        throw new INVALID_DEVICE("'devices' must only contain instances of WebCLDevice; devices["+i+"] = ", devices[i]);

      if (this.getInfo(ocl_info.CL_PROGRAM_DEVICES).indexOf(devices[i]) === -1)
        throw new INVALID_DEVICE("'devices' must all be associated with this WebCLProgram; devices["+i+"] = ", devices[i]);

      devices[i] = this._unwrapInternalOrNull(devices[i]);
    }

    this.buildOptions = (options === null) ? "" : options;

    var supportsKernelArgInfo = true;
    this.getInfo(ocl_info.CL_PROGRAM_DEVICES).forEach(function(device) {
      var deviceVersion = device._internal.getInfo(ocl_info.CL_DEVICE_VERSION);
      var supportsCL12 = (deviceVersion.indexOf("OpenCL 1.2") >= 0);
      supportsKernelArgInfo = supportsKernelArgInfo && supportsCL12;
    });

    if (supportsKernelArgInfo === true) {
      options = this.buildOptions + " -cl-kernel-arg-info";
    }

    // TODO: PROPER WEBCL CALLBACK!
    // TODO: THIS IS LIKELY TO BE TOTALLY UNSAFE!
    this._internal.buildProgram (devices, options, whenFinished);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


// createKernel(name)._owner == this._owner == [WebCLContext]
//
WebCLProgram.prototype.createKernel = function (kernelName)
{
  TRACE (this, "createKernel", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateString(kernelName))
      throw new CLError(ocl_errors.CL_INVALID_KERNEL_NAME, "'kernelName' must be a non-empty string; was " + kernelName);

    // NOTE: Ensure proper memory management on certain platforms by acquiring
    //       ownership of created kernels. This ensures that on releaseAll
    //       kernel's will be released before program.

    var clKernel = this._wrapInternal (this._internal.createKernel(kernelName), this);

    this.kernelsAlreadyCreated = true;

    return clKernel;
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


// createKernelsInProgram()._owner == this._owner == [WebCLContext]
//
WebCLProgram.prototype.createKernelsInProgram = function ()
{
  TRACE (this, "createKernelsInProgram", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    // NOTE: Ensure proper memory management on certain platforms by acquiring
    //       ownership of created kernels. This ensures that on releaseAll
    //       kernel's will be released before program.

    var clKernels = this._wrapInternal (this._internal.createKernelsInProgram(), this);

    this.kernelsAlreadyCreated = true;

    return clKernels;
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


// NOTE: NOT EXPOSED, NOT VISIBLE TO JS!
WebCLProgram.prototype.releaseAll = function ()
{
  TRACE (this, "releaseAll", arguments);
  if(!this._ensureValidObject ()) return;

  try
  {
    this._releaseAllChildren ();

    this._clearRegistry ();

    //this._unregister ();
    this.release ();
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};



} catch(e) { ERROR ("webclprogram.jsm: "+e); }
