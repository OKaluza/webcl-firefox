(function() {

  if (window.webcl) return;



  // == WebCL ====================================================================
  function _WebCL ()
  {
    if (!(this instanceof _WebCL)) return;

    try 
    {
      this._internal = new _NokiaWebCL ();
      this._internal.init(window);
      this._name = "webcl";
    } 
    catch(e) 
    {
      e = _wrapException (e, "webcl");
      console.log ("WebCL: Failed to create or initialize Nokia WebCL Object: " + e);
      throw e;
    }
  };

  _WebCL.prototype = new Object();
  _WebCL.prototype.version = _WebCL.version = "YYYY-MM-DD";
  _WebCL.prototype.getPlatforms = _createDefaultFunctionWrapper ("getPlatforms");
  _WebCL.prototype.createContext = _createDefaultFunctionWrapper ("createContext");
  _WebCL.prototype.getSupportedExtensions = _createDefaultFunctionWrapper ("getSupportedExtensions");
  _WebCL.prototype.enableExtension = _createDefaultFunctionWrapper ("enableExtension");
  _WebCL.prototype.waitForEvents = _createDefaultFunctionWrapper ("waitForEvents");
  _WebCL.prototype.releaseAll = _createDefaultFunctionWrapper ("releaseAll");
  _WebCL.prototype.enumString = _enumString;

  _addEnums(_WebCL.prototype);
  _addEnums(_WebCL);



  // == Window ===================================================================
  window.webcl = new _WebCL();
  window.WebCL = _WebCL;
  window.WebCLPlatform = _Platform;
  window.WebCLDevice = _Device;
  window.WebCLContext = _Context;
  window.WebCLProgram = _Program;
  window.WebCLKernel = _Kernel;
  window.WebCLCommandQueue = _CommandQueue;
  window.WebCLMemoryObject = _MemoryObject;
  window.WebCLBuffer = _Buffer;
  window.WebCLImage = _Image;
  window.WebCLSampler = _Sampler;
  window.WebCLEvent = _Event;
  window.WebCLUserEvent = _UserEvent;
  window.WebCLImageDescriptor = _ImageDescriptor;
  window.WebCLException = _WebCLException;



  // == Base =====================================================================
  function _Base (internal)
  {
    this._internal = internal;
    this._name = "object";
    this._identity = (internal ? internal.getExternalIdentity () : null);
  }

  _Base.prototype.getInfo = _createDefaultFunctionWrapper ("getInfo");

  _Base.prototype.toString = function () { return "[object " + this._name + "]"; }



  // == Platform =================================================================
  function _Platform (internal)
  {
    if (!(this instanceof _Platform)) return;
    _Base.call (this, internal);

    this._name = "WebCLPlatform";
  }
  _Platform.prototype = Object.create (_Base.prototype);

  _Platform.prototype.getDevices = _createDefaultFunctionWrapper ("getDevices");
  _Platform.prototype.getSupportedExtensions = _createDefaultFunctionWrapper ("getSupportedExtensions");
  _Platform.prototype.enableExtension = _createDefaultFunctionWrapper ("enableExtension");



  // == Device ===================================================================
  function _Device (internal)
  {
    if (!(this instanceof _Device)) return;
    _Base.call (this, internal);

    this._name = "WebCLDevice";
  }
  _Device.prototype = Object.create (_Base.prototype);

  _Device.prototype.getSupportedExtensions = _createDefaultFunctionWrapper ("getSupportedExtensions");
  _Device.prototype.enableExtension = _createDefaultFunctionWrapper ("enableExtension");



  // == Context ==================================================================
  function _Context (internal) {
    if (!(this instanceof _Context)) return;
    _Base.call (this, internal);

    this._name = "WebCLContext";
  }
  _Context.prototype = Object.create (_Base.prototype);

  _Context.prototype.createBuffer = _createDefaultFunctionWrapper ("createBuffer");
  _Context.prototype.createCommandQueue = _createDefaultFunctionWrapper ("createCommandQueue");
  _Context.prototype.createImage = _createDefaultFunctionWrapper ("createImage");
  _Context.prototype.createProgram = _createDefaultFunctionWrapper ("createProgram");
  _Context.prototype.createSampler = _createDefaultFunctionWrapper ("createSampler");
  _Context.prototype.createUserEvent = _createDefaultFunctionWrapper ("createUserEvent");
  _Context.prototype.getSupportedImageFormats = _createDefaultFunctionWrapper ("getSupportedImageFormats");
  _Context.prototype.release = _createDefaultFunctionWrapper ("release");
  _Context.prototype.releaseAll = _createDefaultFunctionWrapper ("releaseAll");



  // == Program ==================================================================
  function _Program (internal) {
    if (!(this instanceof _Program)) return;
    _Base.call (this, internal);

    this._name = "WebCLProgram";
  }
  _Program.prototype = Object.create (_Base.prototype);

  _Program.prototype.getBuildInfo = _createDefaultFunctionWrapper ("getBuildInfo");
  _Program.prototype.build = _createDefaultFunctionWrapper ("build");
  _Program.prototype.createKernel = _createDefaultFunctionWrapper ("createKernel");
  _Program.prototype.createKernelsInProgram = _createDefaultFunctionWrapper ("createKernelsInProgram");
  _Program.prototype.release = _createDefaultFunctionWrapper ("release");



  // == Kernel ===================================================================
  function _Kernel (internal) {
    if (!(this instanceof _Kernel)) return;
    _Base.call (this, internal);

    this._name = "WebCLKernel";
  }
  _Kernel.prototype = Object.create (_Base.prototype);

  _Kernel.prototype.getWorkGroupInfo = _createDefaultFunctionWrapper ("getWorkGroupInfo");
  _Kernel.prototype.getArgInfo = _createDefaultFunctionWrapper ("getArgInfo");
  _Kernel.prototype.setArg = _createDefaultFunctionWrapper ("setArg");
  _Kernel.prototype.release = _createDefaultFunctionWrapper ("release");



  // == CommandQueue =============================================================
  function _CommandQueue (internal) {
    if (!(this instanceof _CommandQueue)) return;
    _Base.call (this, internal);

    this._name = "WebCLCommandQueue";
  }
  _CommandQueue.prototype = Object.create (_Base.prototype);

  _CommandQueue.prototype.enqueueCopyBuffer = _createDefaultFunctionWrapper ("enqueueCopyBuffer", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueCopyBufferRect = _createDefaultFunctionWrapper ("enqueueCopyBufferRect", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueCopyImage = _createDefaultFunctionWrapper ("enqueueCopyImage", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueCopyImageToBuffer = _createDefaultFunctionWrapper ("enqueueCopyImageToBuffer", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueCopyBufferToImage = _createDefaultFunctionWrapper ("enqueueCopyBufferToImage", null, _commandQueue_eventPostProc);

  _CommandQueue.prototype.enqueueReadBuffer = _createDefaultFunctionWrapper ("enqueueReadBuffer", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueReadBufferRect = _createDefaultFunctionWrapper ("enqueueReadBufferRect", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueReadImage = _createDefaultFunctionWrapper ("enqueueReadImage", null, _commandQueue_eventPostProc);

  _CommandQueue.prototype.enqueueWriteBuffer = _createDefaultFunctionWrapper ("enqueueWriteBuffer", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueWriteBufferRect = _createDefaultFunctionWrapper ("enqueueWriteBufferRect", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueWriteImage = _createDefaultFunctionWrapper ("enqueueWriteImage", null, _commandQueue_eventPostProc);

  _CommandQueue.prototype.enqueueNDRangeKernel = _createDefaultFunctionWrapper ("enqueueNDRangeKernel", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueMarker = _createDefaultFunctionWrapper ("enqueueMarker", null, _commandQueue_eventPostProc);
  _CommandQueue.prototype.enqueueBarrier = _createDefaultFunctionWrapper ("enqueueBarrier");
  _CommandQueue.prototype.enqueueWaitForEvents = _createDefaultFunctionWrapper ("enqueueWaitForEvents");
  _CommandQueue.prototype.finish = _createDefaultFunctionWrapper ("finish");
  _CommandQueue.prototype.flush = _createDefaultFunctionWrapper ("flush");
  _CommandQueue.prototype.release = _createDefaultFunctionWrapper ("release");


  // Upgrade event parameters with identity.
  function _commandQueue_eventPostProc (rv, args)
  {
    var ev = args[args.length-1];
    if (ev && ev instanceof WebCLEvent)
    {
      if (ev._internal)
      {
        ev._identity = ev._internal.getExternalIdentity ();
      }
    }
  }



  // == MemoryObject =============================================================
  function _MemoryObject (internal) {
    if (!(this instanceof _MemoryObject)) return;
    _Base.call (this, internal);

    this._name = "WebCLMemoryObject";
  }
  _MemoryObject.prototype = Object.create (_Base.prototype);

  _MemoryObject.prototype.release = _createDefaultFunctionWrapper ("release");



  // == Buffer ===================================================================
  function _Buffer (internal)
  {
    if (!(this instanceof _Buffer)) return;
    _MemoryObject.call (this, internal);

    this._name = "WebCLBuffer";
  }
  _Buffer.prototype = Object.create (_MemoryObject.prototype);

  _Buffer.prototype.createSubBuffer = _createDefaultFunctionWrapper ("createSubBuffer");



  // == Image ====================================================================
  function _Image (internal)
  {
    if (!(this instanceof _Image)) return;
    _MemoryObject.call (this, internal);

    this._name = "WebCLImage";
  }
  _Image.prototype = Object.create (_MemoryObject.prototype);



  // == Sampler ==================================================================
  function _Sampler (internal) {
    if (!(this instanceof _Sampler)) return;
    _Base.call (this, internal);

    this._name = "WebCLSampler";
  }
  _Sampler.prototype = Object.create (_Base.prototype);

  _Sampler.prototype.release = _createDefaultFunctionWrapper ("release");



  // == Event ====================================================================
  function _Event (internal) {
    if (!(this instanceof _Event)) return;

    internal = internal || new _NokiaWebCLEvent ();

    _Base.call (this, internal);

    this._name = "WebCLEvent";
  }
  _Event.prototype = Object.create (_Base.prototype);

  _Event.prototype.getProfilingInfo = _createDefaultFunctionWrapper ("getProfilingInfo");
  _Event.prototype.setCallback = _createDefaultFunctionWrapper ("setCallback");
  _Event.prototype.release = _createDefaultFunctionWrapper ("release");



  // == UserEvent ================================================================
  function _UserEvent (internal) {
    if (!(this instanceof _UserEvent)) return;
    _Event.call (this, internal);

    this._name = "WebCLUserEvent";
  }
  _UserEvent.prototype = Object.create (_Event.prototype);

  _UserEvent.prototype.setStatus = _createDefaultFunctionWrapper ("setStatus");



  // == ImageDescriptor ==================================================================
  function _ImageDescriptor (internal) {
    if (!(this instanceof _ImageDescriptor)) return;

    internal = internal || new _NokiaWebCLImageDescriptor ();

    _Base.call (this, internal);

    this._name = "WebCLImageDescriptor";

    this.channelOrder = internal.channelOrder;
    this.channelType = internal.channelType;
    this.width = internal.width;
    this.height = internal.height;
    this.rowPitch = internal.rowPitch;
  }
  _ImageDescriptor.prototype = Object.create (_Base.prototype);

  _ImageDescriptor.prototype.channelOrder = 0;
  _ImageDescriptor.prototype.channelType = 0;
  _ImageDescriptor.prototype.width = 0;
  _ImageDescriptor.prototype.height = 0;
  _ImageDescriptor.prototype.rowPitch = 0;
  delete _ImageDescriptor.prototype.getInfo;



  // == WebCLException ===========================================================
  function _WebCLException (name, message, ctx) {
    this.name = name || "WEBCL_IMPLEMENTATION_FAILURE";
    this.message = message;
    this.ctx = ctx;
  }
  _WebCLException.prototype = new Object();

  _WebCLException.prototype.toString = function ()
  {
    return "[" + this.ctx + "] " + this.name + ": " + this.message;
  };



  // == Internal functions =====================================================

  function _wrapInternalObject (obj)
  {
    if (Array.isArray(obj))
    {
      obj = obj.map(_wrapInternalObject);
    }
    else if (obj && typeof(obj) == "object")
    {
      if (obj.classDescription)
      {
        switch (obj.classDescription)
        {
        case "WebCLPlatform":        return _createInstance (WebCLPlatform, obj);
        case "WebCLDevice":          return _createInstance (WebCLDevice, obj);
        case "WebCLContext":         return _createInstance (WebCLContext, obj);
        case "WebCLProgram":         return _createInstance (WebCLProgram, obj);
        case "WebCLKernel":          return _createInstance (WebCLKernel, obj);
        case "WebCLCommandQueue":    return _createInstance (WebCLCommandQueue, obj);
        case "WebCLMemoryObject":    return _createInstance (WebCLMemoryObject, obj);
        case "WebCLBuffer":          return _createInstance (WebCLBuffer, obj);
        case "WebCLImage":           return _createInstance (WebCLImage, obj);
        case "WebCLSampler":         return _createInstance (WebCLSampler, obj);
        case "WebCLEvent":           return _createInstance (WebCLEvent, obj);
        case "WebCLUserEvent":       return _createInstance (WebCLUserEvent, obj);
        case "WebCLImageDescriptor": return _createInstance (WebCLImageDescriptor, obj);
        }
      }
    }
    return obj;
  };

  function _wrapException (e, ctx)
  {
    if (e instanceof WebCLException)
    {
      return e;
    }

    var name = "WEBCL_IMPLEMENTATION_FAILURE";
    var message = "";

    try {
      var re = /WEBCLEXCEPTION\:([\w=]*).*/.exec(e);
      if (re)
      {
        var exData = JSON.parse(atob(re[1]));
        if (exData)
        {
          ctx += " [" + exData.fileName + ":" + exData.lineNumber + "]";

          switch (exData.type)
          {
          case "cl":
            name = exData.name;
            message = exData.message;
            break;

          case "syntaxerror":
            name = exData.name || "WEBCL_SYNTAX_ERROR";
            message = exData.message || "Invalid number of arguments."
            break;

          case "notimplemented":
            name = exData.name || "WEBCL_NOT_IMPLEMENTED";
            message = exData.message || "Function or feature not implemented.";
            break;

          case "internal":
            name = exData.name || "WEBCL_IMPLEMENTATION_FAILURE";
            message = exData.message || "Internal error.";
            break;

          case "invalidobject":
            name = exData.name || "WEBCL_INVALID_OBJECT";
            message = exData.message || "Invalid/released WebCL object.";
            break;

          default:
            name = exData.name || "WEBCL_UNKNOWN_EXCEPTION";
            message = exData.message || "Unknown WebCL exception.";
            break;
          }
        }
      }
    } catch (e2) { msg = "_wrapException: Failed to process exception: " + e2; }

    return new WebCLException (String(name), String(message), String(ctx));
  };

  function _unwrapInternalObject (obj)
  {
    if (Array.isArray(obj))
    {
      obj = obj.map(_unwrapInternalObject);
    }
    else if (obj && typeof(obj) == "object")
    {
      if (obj instanceof _Platform) return obj._internal;
      if (obj instanceof _Device) return obj._internal;
      if (obj instanceof _Context) return obj._internal;
      if (obj instanceof _Program) return obj._internal;
      if (obj instanceof _Kernel) return obj._internal;
      if (obj instanceof _CommandQueue) return obj._internal;
      if (obj instanceof _MemoryObject) return obj._internal;
      if (obj instanceof _Buffer) return obj._internal;
      if (obj instanceof _Image) return obj._internal;
      if (obj instanceof _Sampler) return obj._internal;
      if (obj instanceof _Event) return obj._internal;
      if (obj instanceof _UserEvent) return obj._internal;
      if (obj instanceof _ImageDescriptor) return obj;  // NOTE: no unwrapping

      // NOTE: We may get objects that contain _Base instances as properties,
      //       that would need unwrapping. Simple object cloning won't do since
      //       that would break e.g. ArrayBufferViews.
      //       The workaround is that for now webclutils.unwrapInternalOrNull
      //       will attempt a 2nd stage unwrap on objects with "_internal"
      //       property.
      /*
      var tmp = Object.create (obj.prototype || {});
      var keys = Object.keys(obj);
      for (var k = 0; k < keys.length; ++k)
      {
        if (obj.hasOwnProperty(keys[k]))
        {
          tmp[keys[k]] = _unwrapInternalObject(obj[keys[k]]);
        }
      }
      obj = tmp;
      */
    }
    return obj;
  };

  function _validateInternal (obj)
  {
    if (!obj || !obj._internal)
    {
      var err;
      if (obj instanceof _WebCL) err = "WEBCL_IMPLEMENTATION_FAILURE";
      else if (obj instanceof _Context) err = "INVALID_CONTEXT";
      else if (obj instanceof _Program) err = "INVALID_PROGRAM";
      else if (obj instanceof _Kernel) err = "INVALID_KERNEL";
      else if (obj instanceof _CommandQueue) err = "INVALID_COMMAND_QUEUE";
      else if (obj instanceof _MemoryObject) err = "INVALID_MEM_OBJECT";
      else if (obj instanceof _Buffer) err = "INVALID_MEM_OBJECT";
      else if (obj instanceof _Image) err = "INVALID_MEM_OBJECT";
      else if (obj instanceof _Sampler) err = "INVALID_SAMPLER";
      else if (obj instanceof _Event) err = "INVALID_EVENT";
      else if (obj instanceof _UserEvent) err = "INVALID_EVENT";
      else if (obj instanceof _ImageDescriptor) err = "INVALID_IMAGE_FORMAT_DESCRIPTOR";
      else err = "WEBCL_IMPLEMENTATION_FAILURE";

      throw new WebCLException (err, "Invalid internal object: " + obj, "_validateInternal");
    }
  };

  function _createDefaultFunctionWrapper (fname, preProcFn, postProcFn)
  {
    return function ()
    {
      try
      {
        _validateInternal (this);

        var args = Array.prototype.slice.call(arguments);

        if (preProcFn && typeof(preProcFn) == "function")
        {
          args = preProcFn (args);
        }


        // Special handling for release & releaseAll
        try
        {
          if (fname === "releaseAll")
          {
            var managedWrapperList = this._internal.getManagedExternalIdentityList ();
            managedWrapperList.forEach(_unregisterWrapperInstance);
            _unregisterWrapperInstance (this._identity);
          }
          else if (fname === "release")
          {
            _unregisterWrapperInstance (this._identity);
          }
        }
        catch (e)
        {
          console.log ("WebCL client wrapper internal error: Failed to unregister wrapper on " + fname + ": " + e);
        }


        var rv = this._internal[fname].apply (this._internal, _unwrapInternalObject(args));

        if (postProcFn && typeof(postProcFn) == "function")
        {
          rv = postProcFn (rv, args);
        }

        if (rv !== undefined)
        {
          return _wrapInternalObject (rv);
        }
      }
      catch (e)
      {
        throw _wrapException (e, this._name+"."+fname);
      }
    };
  };

  function _enumString(enumValue)
  {
    var names = [];
    for (var name in WebCL) {
      if (WebCL[name] === enumValue) {
        names.push(name);
      }
    }
    return (names.length === 1) ? names[0] : names;
  };



  // == Life cycle management ====================================================
  // These functions should be used when creating wrappers for WebCL internal (XPCOM) objects.
  // Existing objects will be re-used.

  function _createInstance(clazz, internal)
  {
    var wrapper = _lookForExistingWrapperInstance(internal);
    if (!wrapper)
    {
      wrapper = new clazz (internal);
      _registerWrapperInstance (wrapper);
    }
    return wrapper;
  }


  function _lookForExistingWrapperInstance (obj)
  {
    if (!obj || typeof(obj) != "object" || typeof(obj.getExternalIdentity) != "function")
    {
      var msg = "Bad object: expected internal WebCL object, got " + obj;
      console.log ("WebCL wrapper internal error: " + msg);
      throw new WebCLException (null, msg);
    }

    var identity = obj.getExternalIdentity ();
    if (identity in gWrapperRegistry)
    {
      return gWrapperRegistry[identity].wrapper;
    }

    return null;
  }


  function _registerWrapperInstance (wrapper)
  {
    if (!(wrapper instanceof _Base))
    {
      var msg = "Bad wrapper instance, expected _Base, got: " + wrapper;
      console.log ("WebCL wrapper internal error: " + msg);
      throw new WebCLException (null, msg);
    }

    if (!wrapper._identity)
    {
      // Missing identity
      // console.log ("_registerWrapperInstance: missing identity!");
      return;
    }

    if (wrapper._identity in gWrapperRegistry)
    {
      // Identity already in registry
      // console.log ("_registerWrapperInstance: identity already in registry: " + wrapper._identity + "!");
      return;
    }

    // Create new container in registry
    gWrapperRegistry[wrapper._identity] = { wrapper: wrapper, refCnt: 1 };
  }


  function _unregisterWrapperInstance (wrapperOrIdentity)
  {
    var identity = null;
    if (wrapperOrIdentity instanceof _Base)
    {
      identity = wrapperOrIdentity._identity;
    }
    else
    {
      identity = wrapperOrIdentity;
    }

    if (identity && identity in gWrapperRegistry)
    {
      var container = gWrapperRegistry[identity];
      if (container.refCnt > 1)
      {
        --container.refCnt;
      }
      else
      {
        container.refCnt = 0;
        container.wrapper = null;
        delete gWrapperRegistry[identity];
      }
    }
    else
    {
      // console.log ("_unregisterWrapperInstance: identity " + identity + " not found!");
    }
  }


  var gWrapperRegistry = {};



  // == Constants ================================================================

  function _addEnums(namespace) 
  {
    namespace.SUCCESS = 0;
    namespace.DEVICE_NOT_FOUND = -1;
    namespace.DEVICE_NOT_AVAILABLE = -2;
    namespace.COMPILER_NOT_AVAILABLE = -3;
    namespace.MEM_OBJECT_ALLOCATION_FAILURE = -4;
    namespace.OUT_OF_RESOURCES = -5;
    namespace.OUT_OF_HOST_MEMORY = -6;
    namespace.PROFILING_INFO_NOT_AVAILABLE = -7;
    namespace.MEM_COPY_OVERLAP = -8;
    namespace.IMAGE_FORMAT_MISMATCH = -9;
    namespace.IMAGE_FORMAT_NOT_SUPPORTED = -10;
    namespace.BUILD_PROGRAM_FAILURE = -11;
    namespace.MAP_FAILURE = -12;
    namespace.MISALIGNED_SUB_BUFFER_OFFSET = -13;
    namespace.EXEC_STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST = -14;
    namespace.INVALID_VALUE = -30;
    namespace.INVALID_DEVICE_TYPE = -31;
    namespace.INVALID_PLATFORM = -32;
    namespace.INVALID_DEVICE = -33;
    namespace.INVALID_CONTEXT = -34;
    namespace.INVALID_QUEUE_PROPERTIES = -35;
    namespace.INVALID_COMMAND_QUEUE = -36;
    namespace.INVALID_HOST_PTR = -37;
    namespace.INVALID_MEM_OBJECT = -38;
    namespace.INVALID_IMAGE_FORMAT_DESCRIPTOR = -39;
    namespace.INVALID_IMAGE_SIZE = -40;
    namespace.INVALID_SAMPLER = -41;
    namespace.INVALID_BINARY = -42;
    namespace.INVALID_BUILD_OPTIONS = -43;
    namespace.INVALID_PROGRAM = -44;
    namespace.INVALID_PROGRAM_EXECUTABLE = -45;
    namespace.INVALID_KERNEL_NAME = -46;
    namespace.INVALID_KERNEL_DEFINITION = -47;
    namespace.INVALID_KERNEL = -48;
    namespace.INVALID_ARG_INDEX = -49;
    namespace.INVALID_ARG_VALUE = -50;
    namespace.INVALID_ARG_SIZE = -51;
    namespace.INVALID_KERNEL_ARGS = -52;
    namespace.INVALID_WORK_DIMENSION = -53;
    namespace.INVALID_WORK_GROUP_SIZE = -54;
    namespace.INVALID_WORK_ITEM_SIZE = -55;
    namespace.INVALID_GLOBAL_OFFSET = -56;
    namespace.INVALID_EVENT_WAIT_LIST = -57;
    namespace.INVALID_EVENT = -58;
    namespace.INVALID_OPERATION = -59;
    namespace.INVALID_GL_OBJECT = -60;
    namespace.INVALID_BUFFER_SIZE = -61;
    namespace.INVALID_MIP_LEVEL = -62;
    namespace.INVALID_GLOBAL_WORK_SIZE = -63;
    namespace.INVALID_PROPERTY = -64;
    namespace.VERSION_1_0 = 1;
    namespace.VERSION_1_1 = 1;
    namespace.FALSE = 0;
    namespace.TRUE = 1;
    namespace.PLATFORM_PROFILE = 0x0900;
    namespace.PLATFORM_VERSION = 0x0901;
    namespace.PLATFORM_NAME = 0x0902;
    namespace.PLATFORM_VENDOR = 0x0903;
    namespace.PLATFORM_EXTENSIONS = 0x0904;
    namespace.DEVICE_TYPE_DEFAULT = (1<<0);
    namespace.DEVICE_TYPE_CPU = (1<<1);
    namespace.DEVICE_TYPE_GPU = (1<<2);
    namespace.DEVICE_TYPE_ACCELERATOR = (1<<3);
    namespace.DEVICE_TYPE_ALL = 0xFFFFFFFF;
    namespace.DEVICE_TYPE = 0x1000;
    namespace.DEVICE_VENDOR_ID = 0x1001;
    namespace.DEVICE_MAX_COMPUTE_UNITS = 0x1002;
    namespace.DEVICE_MAX_WORK_ITEM_DIMENSIONS = 0x1003;
    namespace.DEVICE_MAX_WORK_GROUP_SIZE = 0x1004;
    namespace.DEVICE_MAX_WORK_ITEM_SIZES = 0x1005;
    namespace.DEVICE_PREFERRED_VECTOR_WIDTH_CHAR = 0x1006;
    namespace.DEVICE_PREFERRED_VECTOR_WIDTH_SHORT = 0x1007;
    namespace.DEVICE_PREFERRED_VECTOR_WIDTH_INT = 0x1008;
    namespace.DEVICE_PREFERRED_VECTOR_WIDTH_LONG = 0x1009;
    namespace.DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT = 0x100A;
    namespace.DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE = 0x100B;
    namespace.DEVICE_MAX_CLOCK_FREQUENCY = 0x100C;
    namespace.DEVICE_ADDRESS_BITS = 0x100D;
    namespace.DEVICE_MAX_READ_IMAGE_ARGS = 0x100E;
    namespace.DEVICE_MAX_WRITE_IMAGE_ARGS = 0x100F;
    namespace.DEVICE_MAX_MEM_ALLOC_SIZE = 0x1010;
    namespace.DEVICE_IMAGE2D_MAX_WIDTH = 0x1011;
    namespace.DEVICE_IMAGE2D_MAX_HEIGHT = 0x1012;
    namespace.DEVICE_IMAGE3D_MAX_WIDTH = 0x1013;
    namespace.DEVICE_IMAGE3D_MAX_HEIGHT = 0x1014;
    namespace.DEVICE_IMAGE3D_MAX_DEPTH = 0x1015;
    namespace.DEVICE_IMAGE_SUPPORT = 0x1016;
    namespace.DEVICE_MAX_PARAMETER_SIZE = 0x1017;
    namespace.DEVICE_MAX_SAMPLERS = 0x1018;
    namespace.DEVICE_MEM_BASE_ADDR_ALIGN = 0x1019;
    namespace.DEVICE_SINGLE_FP_CONFIG = 0x101B;
    namespace.DEVICE_GLOBAL_MEM_CACHE_TYPE = 0x101C;
    namespace.DEVICE_GLOBAL_MEM_CACHELINE_SIZE = 0x101D;
    namespace.DEVICE_GLOBAL_MEM_CACHE_SIZE = 0x101E;
    namespace.DEVICE_GLOBAL_MEM_SIZE = 0x101F;
    namespace.DEVICE_MAX_CONSTANT_BUFFER_SIZE = 0x1020;
    namespace.DEVICE_MAX_CONSTANT_ARGS = 0x1021;
    namespace.DEVICE_LOCAL_MEM_TYPE = 0x1022;
    namespace.DEVICE_LOCAL_MEM_SIZE = 0x1023;
    namespace.DEVICE_ERROR_CORRECTION_SUPPORT = 0x1024;
    namespace.DEVICE_PROFILING_TIMER_RESOLUTION = 0x1025;
    namespace.DEVICE_ENDIAN_LITTLE = 0x1026;
    namespace.DEVICE_AVAILABLE = 0x1027;
    namespace.DEVICE_COMPILER_AVAILABLE = 0x1028;
    namespace.DEVICE_EXECUTION_CAPABILITIES = 0x1029;
    namespace.DEVICE_QUEUE_PROPERTIES = 0x102A;
    namespace.DEVICE_NAME = 0x102B;
    namespace.DEVICE_VENDOR = 0x102C;
    namespace.DRIVER_VERSION = 0x102D;
    namespace.DEVICE_PROFILE = 0x102E;
    namespace.DEVICE_VERSION = 0x102F;
    namespace.DEVICE_EXTENSIONS = 0x1030;
    namespace.DEVICE_PLATFORM = 0x1031;
    namespace.DEVICE_DOUBLE_FP_CONFIG = 0x1032;
    namespace.DEVICE_HALF_FP_CONFIG = 0x1033;
    namespace.DEVICE_PREFERRED_VECTOR_WIDTH_HALF = 0x1034;
    namespace.DEVICE_HOST_UNIFIED_MEMORY = 0x1035;
    namespace.DEVICE_NATIVE_VECTOR_WIDTH_CHAR = 0x1036;
    namespace.DEVICE_NATIVE_VECTOR_WIDTH_SHORT = 0x1037;
    namespace.DEVICE_NATIVE_VECTOR_WIDTH_INT = 0x1038;
    namespace.DEVICE_NATIVE_VECTOR_WIDTH_LONG = 0x1039;
    namespace.DEVICE_NATIVE_VECTOR_WIDTH_FLOAT = 0x103A;
    namespace.DEVICE_NATIVE_VECTOR_WIDTH_DOUBLE = 0x103B;
    namespace.DEVICE_NATIVE_VECTOR_WIDTH_HALF = 0x103C;
    namespace.DEVICE_OPENCL_C_VERSION = 0x103D;
    namespace.FP_DENORM = (1<<0);
    namespace.FP_INF_NAN = (1<<1);
    namespace.FP_ROUND_TO_NEAREST = (1<<2);
    namespace.FP_ROUND_TO_ZERO = (1<<3);
    namespace.FP_ROUND_TO_INF = (1<<4);
    namespace.FP_FMA = (1<<5);
    namespace.FP_SOFT_FLOAT = (1<<6);
    namespace.NONE = 0x0;
    namespace.READ_ONLY_CACHE = 0x1;
    namespace.READ_WRITE_CACHE = 0x2;
    namespace.LOCAL = 0x1;
    namespace.GLOBAL = 0x2;
    namespace.EXEC_KERNEL = (1<<0);
    namespace.EXEC_NATIVE_KERNEL = (1<<1);
    namespace.QUEUE_OUT_OF_ORDER_EXEC_MODE_ENABLE = (1<<0);
    namespace.QUEUE_PROFILING_ENABLE = (1<<1);
    namespace.CONTEXT_DEVICES = 0x1081;
    namespace.CONTEXT_PROPERTIES = 0x1082;
    namespace.CONTEXT_NUM_DEVICES = 0x1083;
    namespace.CONTEXT_PLATFORM = 0x1084;
    namespace.QUEUE_CONTEXT = 0x1090;
    namespace.QUEUE_DEVICE = 0x1091;
    namespace.QUEUE_PROPERTIES = 0x1093;
    namespace.MEM_READ_WRITE = (1<<0);
    namespace.MEM_WRITE_ONLY = (1<<1);
    namespace.MEM_READ_ONLY = (1<<2);
    namespace.MEM_USE_HOST_PTR = (1<<3);
    namespace.MEM_ALLOC_HOST_PTR = (1<<4);
    namespace.MEM_COPY_HOST_PTR = (1<<5);
    namespace.R = 0x10B0;
    namespace.A = 0x10B1;
    namespace.RG = 0x10B2;
    namespace.RA = 0x10B3;
    namespace.RGB = 0x10B4;
    namespace.RGBA = 0x10B5;
    namespace.BGRA = 0x10B6;
    namespace.ARGB = 0x10B7;
    namespace.INTENSITY = 0x10B8;
    namespace.LUMINANCE = 0x10B9;
    namespace.Rx = 0x10BA;
    namespace.RGx = 0x10BB;
    namespace.RGBx = 0x10BC;
    namespace.SNORM_INT8 = 0x10D0;
    namespace.SNORM_INT16 = 0x10D1;
    namespace.UNORM_INT8 = 0x10D2;
    namespace.UNORM_INT16 = 0x10D3;
    namespace.UNORM_SHORT_565 = 0x10D4;
    namespace.UNORM_SHORT_555 = 0x10D5;
    namespace.UNORM_INT_101010 = 0x10D6;
    namespace.SIGNED_INT8 = 0x10D7;
    namespace.SIGNED_INT16 = 0x10D8;
    namespace.SIGNED_INT32 = 0x10D9;
    namespace.UNSIGNED_INT8 = 0x10DA;
    namespace.UNSIGNED_INT16 = 0x10DB;
    namespace.UNSIGNED_INT32 = 0x10DC;
    namespace.HALF_FLOAT = 0x10DD;
    namespace.FLOAT = 0x10DE;
    namespace.MEM_OBJECT_BUFFER = 0x10F0;
    namespace.MEM_OBJECT_IMAGE2D = 0x10F1;
    namespace.MEM_OBJECT_IMAGE3D = 0x10F2;
    namespace.MEM_TYPE = 0x1100;
    namespace.MEM_FLAGS = 0x1101;
    namespace.MEM_SIZE = 0x1102;
    namespace.MEM_HOST_PTR = 0x1103;
    namespace.MEM_MAP_COUNT = 0x1104;
    namespace.MEM_CONTEXT = 0x1106;
    namespace.MEM_ASSOCIATED_MEMOBJECT = 0x1107;
    namespace.MEM_OFFSET = 0x1108;
    namespace.IMAGE_FORMAT = 0x1110;
    namespace.IMAGE_ELEMENT_SIZE = 0x1111;
    namespace.IMAGE_ROW_PITCH = 0x1112;
    namespace.IMAGE_SLICE_PITCH = 0x1113;
    namespace.IMAGE_WIDTH = 0x1114;
    namespace.IMAGE_HEIGHT = 0x1115;
    namespace.IMAGE_DEPTH = 0x1116;
    namespace.ADDRESS_NONE = 0x1130;
    namespace.ADDRESS_CLAMP_TO_EDGE = 0x1131;
    namespace.ADDRESS_CLAMP = 0x1132;
    namespace.ADDRESS_REPEAT = 0x1133;
    namespace.ADDRESS_MIRRORED_REPEAT = 0x1134;
    namespace.FILTER_NEAREST = 0x1140;
    namespace.FILTER_LINEAR = 0x1141;
    namespace.SAMPLER_CONTEXT = 0x1151;
    namespace.SAMPLER_NORMALIZED_COORDS = 0x1152;
    namespace.SAMPLER_ADDRESSING_MODE = 0x1153;
    namespace.SAMPLER_FILTER_MODE = 0x1154;
    namespace.MAP_READ = (1<<0);
    namespace.MAP_WRITE = (1<<1);
    namespace.PROGRAM_CONTEXT = 0x1161;
    namespace.PROGRAM_NUM_DEVICES = 0x1162;
    namespace.PROGRAM_DEVICES = 0x1163;
    namespace.PROGRAM_SOURCE = 0x1164;
    namespace.PROGRAM_BINARY_SIZES = 0x1165;
    namespace.PROGRAM_BINARIES = 0x1166;
    namespace.PROGRAM_BUILD_STATUS = 0x1181;
    namespace.PROGRAM_BUILD_OPTIONS = 0x1182;
    namespace.PROGRAM_BUILD_LOG = 0x1183;
    namespace.BUILD_SUCCESS = 0;
    namespace.BUILD_NONE = -1;
    namespace.BUILD_ERROR = -2;
    namespace.BUILD_IN_PROGRESS = -3;
    namespace.KERNEL_FUNCTION_NAME = 0x1190;
    namespace.KERNEL_NUM_ARGS = 0x1191;
    namespace.KERNEL_CONTEXT = 0x1193;
    namespace.KERNEL_PROGRAM = 0x1194;
    namespace.KERNEL_WORK_GROUP_SIZE = 0x11B0;
    namespace.KERNEL_COMPILE_WORK_GROUP_SIZE = 0x11B1;
    namespace.KERNEL_LOCAL_MEM_SIZE = 0x11B2;
    namespace.KERNEL_PREFERRED_WORK_GROUP_SIZE_MULTIPLE = 0x11B3;
    namespace.KERNEL_PRIVATE_MEM_SIZE = 0x11B4;
    namespace.EVENT_COMMAND_QUEUE = 0x11D0;
    namespace.EVENT_COMMAND_TYPE = 0x11D1;
    namespace.EVENT_COMMAND_EXECUTION_STATUS = 0x11D3;
    namespace.EVENT_CONTEXT = 0x11D4;
    namespace.COMMAND_NDRANGE_KERNEL = 0x11F0;
    namespace.COMMAND_TASK = 0x11F1;
    namespace.COMMAND_NATIVE_KERNEL = 0x11F2;
    namespace.COMMAND_READ_BUFFER = 0x11F3;
    namespace.COMMAND_WRITE_BUFFER = 0x11F4;
    namespace.COMMAND_COPY_BUFFER = 0x11F5;
    namespace.COMMAND_READ_IMAGE = 0x11F6;
    namespace.COMMAND_WRITE_IMAGE = 0x11F7;
    namespace.COMMAND_COPY_IMAGE = 0x11F8;
    namespace.COMMAND_COPY_IMAGE_TO_BUFFER = 0x11F9;
    namespace.COMMAND_COPY_BUFFER_TO_IMAGE = 0x11FA;
    namespace.COMMAND_MAP_BUFFER = 0x11FB;
    namespace.COMMAND_MAP_IMAGE = 0x11FC;
    namespace.COMMAND_UNMAP_MEM_OBJECT = 0x11FD;
    namespace.COMMAND_MARKER = 0x11FE;
    namespace.COMMAND_ACQUIRE_GL_OBJECTS = 0x11FF;
    namespace.COMMAND_RELEASE_GL_OBJECTS = 0x1200;
    namespace.COMMAND_READ_BUFFER_RECT = 0x1201;
    namespace.COMMAND_WRITE_BUFFER_RECT = 0x1202;
    namespace.COMMAND_COPY_BUFFER_RECT = 0x1203;
    namespace.COMMAND_USER = 0x1204;
    namespace.COMPLETE = 0x0;
    namespace.RUNNING = 0x1;
    namespace.SUBMITTED = 0x2;
    namespace.QUEUED = 0x3;
    namespace.BUFFER_CREATE_TYPE_REGION = 0x1220;
    namespace.PROFILING_COMMAND_QUEUED = 0x1280;
    namespace.PROFILING_COMMAND_SUBMIT = 0x1281;
    namespace.PROFILING_COMMAND_START = 0x1282;
    namespace.PROFILING_COMMAND_END = 0x1283;
  };

})();
