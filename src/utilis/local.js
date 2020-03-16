// 设置localStroage
export  function setLocal(key,val){
    window.localStorage.setItem(key,val);
}

// 获取localStroage
export  function getLocal(key){
   return JSON.parse(window.localStorage.getItem(key));
}

// 删除localStroage
export  function removeLocal(key){
    window.localStorage.removeItem(key);
} 