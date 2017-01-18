

function zhangHu(){
	var _liList=$("#login ul")[0].children;
	for(var i=0;i<_liList.length;i++){
		_liList.index=i;
		_liList[i].onmouseover=function(){
			this.onclick=function(){
				for(var i=0;i<_liList.length;i++){
					_liList[i].children[0].className="";
				}
			}
			this.children[0].className="colorWeight";
		}
		_liList[i].onmouseout=function(){
			this.children[0].className="";
		}
	}
}
window.onload=function(){
	zhangHu();
}
