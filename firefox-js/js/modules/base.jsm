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


var EXPORTED_SYMBOLS = [ "Base" ];

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

var Exception = Components.Exception;

Cu.import("resource://nrcwebcl/modules/logger.jsm");

Cu.import ("resource://nrcwebcl/modules/webclutils.jsm");
Cu.import ("resource://nrcwebcl/modules/mixin.jsm");


// TODO: implement better identity generation
var gExternalIdentitySeed = 1;


function Base ()
{
  // _owner: (Object) Resource manager object controlling this object's life cycle
  // Note: Set by owner in _registerObject.
  this._owner = null;

  // _identity: (String) Internal identity used as resource management key. Stringified from
  //                     CData pointer value.
  this._identity = null;

  // _externalIdentity: (String) External identity, exposed to client script. For security reasons
  //                             we don't want to expose actual memory addresses. Identities could
  //                             be unified, but then we'd just need to maintain separate "external"
  //                             identity on lower level, since the underlaying CData pointer is
  //                             required for working with OpenCL.
  this._externalIdentity = String (gExternalIdentitySeed++);

  // _invalid: (Boolean) True if object has been invalidated and general API functionality should
  //                     not be allowed. Object becomes invalidated after being released. This
  //                     mechanism is designed to guard against use through dangling references.
  this._invalid = false;
}


Base.prototype._ensureValidObject = function ()
{
  return !this._invalid;
};


Base.prototype._register = function (owner)
{
  // TODO: REMOVE COMPLETELY
  throw "Base.prototype._register: DEPRECATED!";
}


Base.prototype._unregister = function ()
{
  TRACE (this, "_unregister", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  if (this._owner && this._identity)
  {
    this._owner._unregisterObject (this._identity);
    this._owner = null; // just in case...
  }
};


Base.prototype._wrapInternal = function (value, ownerOverride)
{
  TRACE (this, "_wrapInternal", arguments);
  return webclutils.wrapInternal (value, ownerOverride || this._owner);
};


Base.prototype._unwrapInternalOrNull = function (value)
{
  TRACE (this, "_unwrapInternalOrNull", arguments);
  return webclutils.unwrapInternalOrNull (value);
};


Base.prototype._unwrapInternal = function (value)
{
  TRACE (this, "_unwrapInternal", arguments);
  return webclutils.unwrapInternal (value);
};


Base.prototype._getIdentity = function ()
{
  TRACE (this, "_getIdentity", arguments);
  //return (this._internal ? this._internal.getIdentity() : null);
  return this._identity;
};


Base.prototype.release = function ()
{
  TRACE (this, "release", arguments);
  TRACE_RESOURCES (this, "release");
  if(!this._ensureValidObject ()) return;

  try
  {
    let doUnreg = false;
    let doRelease = false;

    if (this._internal && "release" in this._internal)
    {
      doRelease = true;
      doUnreg = true;
    }
    else
    {
      doUnreg = true;
    }

    if (doUnreg)
    {
      if (this._owner)
      {
        if ("_forEachRegistered" in this)
        {
          var owner = this._owner;
          this._forEachRegistered (function (o)
          {
            owner._registerObject (o);
          });

          this._clearRegistry ();
        }

        this._unregister ();
      }
    }

    if (doRelease)
    {
      this._internal.release ();
      this._internal = null;
      this._invalid = true;
    }
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


Base.prototype.getExternalIdentity = function ()
{
  return String(this._externalIdentity);
}



//------------------------------------------------------------------------------
// Class Info

Base.prototype.getInterfaces = function (count)
{
  var interfaces = this._interfaces;
  if (!interfaces || !Array.isArray(interfaces))
  {
    interfaces = [];
  }

  count.value = interfaces.length;
  return interfaces;
};
