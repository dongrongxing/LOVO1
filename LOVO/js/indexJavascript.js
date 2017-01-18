


//****************秒杀*************************************/


function BannerLun(){
	this.lun=$(".bannerLun")[0].children[0];
	this.timer=0;
	this.left=0;
	this.n=1;
	this.btn=null;
	this.flag=0;
	this.btn=$(".btn")[0].children;
	var _self=this;
	this.start=function(){
		window.clearTimeout(_self.timer);
	    _self.left-=30;
		if(Math.abs(_self.left)%1920<0 || _self.flag==0){
			_self.lun.style.left=_self.left+"px";
			if(Math.abs(_self.left)%1920==0){
				_self.lun.style.left="-1920*"+_self.n+"px";
				_self.n++;
				_self.flag=1;
			}
			if(Math.abs(_self.left)>=3840){
				_self.left=0;
			}
			_self.timer=window.setTimeout(_self.start,30);
		}
		
		for(var i=0;i<_self.btn.length;i++){
	    	_self.btn[i].index=i;
	    	_self.btn[i].onmouseover=function(){
		    	window.clearTimeout(_self.timer);
		    	_self.lun.style.left=-1920*(this.index+1)+"px";
		    	_self.left-=30;
		    	
		    }
	    	_self.btn[i].onmouseout=function(){
	    		_self.timer=window.setTimeout(function(){
					_self.flag=0;
					_self.start();
				},2000);
		    }
	    }
		/*for(var i=0;i<_self.btn.length;i++){
	    	_self.btn[i].index=i;
	    	_self.btn[i].onmouseover=function(){
		    	window.clearTimeout(_self.timer);
	    		_self.lun.style.left=-1920*this.index+"px";
	    		_self.timer=window.setTimeout(function(){
					_self.flag=0;
					_self.start();
				},2000);
		    }
	    }*/
		
		if(_self.flag==1){
			_self.timer=window.setTimeout(function(){
				_self.flag=0;
				_self.start();
			},2000);
		}
	}
}




function ShowMode(_allMode){
	var _ul=document.getElementById(_allMode).parentNode;
	for(var i=1;i<_ul.children.length;i++){
		_ul.children[i].index=i;
		_ul.children[i].onmouseover=function(e){
			e=e||window.event;
			this.children[1].style.display="block"
		}
		_ul.children[i].onmouseout=function(e){
			e=e||window.event;
			this.children[1].style.display="none"
		}
	}
}

function ShowNav(){
	$("#nav li").mouseenter(function(){
		$(this)[0].children[1].style.display="block";
		$(this)[0].style.background="darkblue";
		$(this)[0].children[0].style.color="#fff";
	});
	$("#nav li").mouseleave(function(){
		$(this)[0].style.background="#fff";
		$(this)[0].children[1].style.display="none";
		$(this)[0].children[0].style.color="#000";
	});
}
function ShowLove(){
	$("#lovo").mouseenter(function(){
		$("#lovo+ul").css("display","block");
	});
	$("#lovo").mouseleave(function(){
		$("#lovo+ul").css("display","none");
	});
	$("#lovo").next("ul").mouseenter(function(){
		$("#lovo+ul").css("display","block");
	});
	$("#lovo").next("ul").mouseleave(function(){
		$("#lovo+ul").css("display","none");
	});
}


/*function showborderLeft(){
	var _borderLeft=document.getElementById("borderLeft");
	var _height=document.documentElement.clientHeight||document.body.clientHeight;
	var _scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight;
	_borderLeft.style.height=_height+_scrollHeight+"px";
}*/
window.onload=function(){
//	showborderLeft();//左侧的悬浮菜单；
	new ShowLove();//topNav的下拉菜单；
	new ShowNav();//nav的下拉菜单；
	new ShowMode("allMode");//bannerMode的菜单；
	new BannerLun().start();
	miaoSha();
}
