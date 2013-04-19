;(function($){
    $.extend(jQuery.easing,{
        starFly:function(x,t,b,c,d){
            return c*(t/=d)*t*t*t+b; 
        }
    });

    $.fn.flyingLetter=function(option){
        console.log("gaga");
        var $obj = $(this);
        var opts = $.extend({},$.fn.flyingLetter.defaults,option);
        var viewSize,maxWidth,maxHeight;
        checkSize();

        $(window).resize(function(e){
            checkSize(); 
        }).scroll(function(e){
            checkSize(); 
        });
        
        fly();
        setInterval(function(){
            fly(); 
        },opts.makeLetterInterval);
        return $obj; 
        
        function checkSize(){
            viewSize = getViewSize();
            maxWidth = viewSize[0];
            maxHeight = viewSize[1];
           // console.log("maxWidth maxHeight"+maxWidth+","+maxHeight);
        };
        
        function fly(){
            var html = '',xpos,rotate,rotateStyle;
            //console.log("fly"); 
            for(var i=0;i<opts.makeLetterNum;i++){
                xpos = [-opts.letterMaxSize[1],maxWidth-opts.letterMaxSize[1]-20]; 
                rotate = rand(0,359); 
                rotateStyle = '-moz-transform:rotate('+rotate+'deg); -webkit-transform:rotate('+rotate+'deg); -o-transform:rotate('+rotate+'deg); transform:rotate('+rotate+'deg)';
                html+='<b class="flyingLetter" status="start" xpos="'+xpos.join(',')+'" style="left:'+(maxWidth*0.5)+'px;top:'+(maxHeight*0.35)+'px;'+rotateStyle+';position:fixed;width:1px;height:1px;font-size:3px;line-height:120%;color:#FFF;z-index:0;-webkit-text-size-adjust:none;">'+randoms(1,opts.letters)+'</b>';
            }
            console.log("html="+html);
            $obj.append(html).find("b[status=start]").each(function(){
                var $this = $(this); 
                var html = null;
                xpos = $this.attr('xpos').split(',');
                $this.attr('status','run').css({color:'#'+randoms(6,'0123456789ABCDEF'),opacity:rand(opts.bright[0]*10,opts.bright[1]*10)*0.1})
                .animate({
                    left:xpos[rand(0,1)],
                    top:rand(-Math.max(200,maxHeight*0.2),maxHeight-10),
                    fontSize:rand(opts.letterMaxSize[0]/4,opts.letterMaxSize[1])+'px'
                },rand(opts.letterFlyTime*0.5,opts.letterFlyTime*4),'starFly',function(){
                    $this.remove(); 
                });
            });
        }
            function randoms(length,chars){
                var length = length || 1;
                var chars  = chars || '012345689abcdefghijklmnopqrstuvwxyz';
                var hash = ''; 
                var maxNum = chars.length-1;
                var num = 0 ;
                for(var i=0;i<length;i++){
                 //   num = rand(0,maxNum-1); 
                  //  hash+=chars.slice(num,num+1);
                   hash+=chars[rand(0,maxNum-1)]; 
                }
                return hash;
            }
    }; 

    $.fn.flyingLetter.defaults = {
        letters : ['liang jia min','jia min','min ge','lvgengm','lgm','jm','jiamin liang'], 
        letterMaxSize: Array(100,100),
        bright: Array( 0.4 , 1 ),  
        letterFlyTime:12000,   // 飞行时间
        makeLetterInterval:1000, //制造letter的时间
        makeLetterNum: 2       //每次产生多少个letter
    }; 
    $.fn.flyingLetter.version = '1.0.0';
})(jQuery);
