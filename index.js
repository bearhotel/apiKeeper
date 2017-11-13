
//example models
/*
{
    'apiExample':{
          url:'',
          data:'',
          method:'',//post or get
          routeParams:{} //如用替换url中{param} 位置
          success:null,
          error:null
    }
}
*/
function keeper(){
    let api={};
    let defaultCfg={
        _urlPrefix:'',
        _success:null,
        _error:null
    };
    let toStr=Object.prototype.toString;
    let fetch=null;
    function isArr(o){
        return toStr.call(o)=='[object Array]'
    }
    function isObj(o){
        return toStr.call(o)=='[object Object]'
    }
    this.defaultConfig=function(opt={},jquery){
        fetch=jquery;
        Object.assign(defaultCfg,opt)
    }
    function replaceRouteParam(url,param){
      if(!isObj(param)){ return url; }
      let reg=/{(.+?)}/gim;  
      return  url.replace(reg,function(word){
            return param[word.replace(/[{}]/g,'')] ;
      });
    }
    api.loadModels=function(models=[]){
        isArr(models)&&models.forEach(m=>{
            for(let apiName in m){
                api[apiName]=function(arg){
                    let tmpCfg=Object.assign({},arg)
                    tmpCfg._success=defaultCfg._success;
                    tmpCfg._error=defaultCfg._error;
                    tmpCfg.url=`${defaultCfg._urlPrefix}${replaceRouteParam(tmpCfg.url,tmpCfg.routeParams)}`;
                    tmpCfg.success=function(res){
                       if(tmpCfg._success(res)!==false){
                           arg.success&& arg.success(res)
                       }
                    };
                    tmpCfg.error=function(res){
                        if(tmpCfg._error(res)!==false){
                            arg.error&& arg.error(res)
                        }
                    }
                    return fetch(tmpCfg);
                }
            }
          
        })
    }
    return api;
}

export default new keeper().defaultConfig;