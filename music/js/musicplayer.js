/**
 * Created by Administrator on 2017/6/6 0006.
 */
'use strict';
$(function(){
//    移入移出图标效果
    $('.misControl').delegate('img','mouseenter',function(){
        let title=$(this).attr('title');
        $(this).css({'cursor':'pointer'});
        if(title=='音量'){
            $(this).attr({'src':'images/msi_volumetwo.png'});
        }else if(title=='随机'){
            $(this).attr({'src':'images/mis_randomtwo.png'});
        }else if(title=='循环'){
            $(this).attr({'src':'images/mis_looptwo.png'});
        } else if(title=='单曲'){
            $(this).attr({'src':'images/mis_singletwo.png'});
        }else if(title=='列表'){
            $(this).attr({'src':'images/mis_listtwo.png'});
        }else if(title=='上一首'){
            $(this).attr({'src':'images/mis_pretwo.png'});
        }else if(title=='下一首'){
            $(this).attr({'src':'images/mis_nextwo.png'});
        }else if(title=='播放'){
            $(this).attr({'src':'images/mis_playtwo.png'});
        }else if(title=='删除'){
            $(this).attr({'src':'images/mis_cleartwo.png'});
        }else if(title=='exit'){
            $(this).attr({'src':'images/mis_exittwo.png'});
        }else if(title=='暂停'){
            $(this).attr({'src':'images/mis_stoptwo.png'});
        }  else if(title=='now'){
            $(this).attr({'src':'images/mis_nowplay.png'});
        }else{
            $(this).attr({'src':'images/mis_addtwo.png'});
        }
    });
    $('.misControl').delegate('img','mouseleave',function(){
        let title=$(this).attr('title');
        $(this).css({'cursor':'none'});
        if(title=='音量'){
            $(this).attr({'src':'images/msi_volumeone.png'});
        }else if(title=='随机'){
            $(this).attr({'src':'images/mis_randomone.png'});
        }else if(title=='循环'){
            $(this).attr({'src':'images/mis_loopone.png'});
        } else if(title=='单曲'){
            $(this).attr({'src':'images/mis_singleone.png'});
        }else if(title=='列表'){
            $(this).attr({'src':'images/mis_listone.png'});
        }else if(title=='上一首'){
            $(this).attr({'src':'images/mis_preone.png'});
        }else if(title=='下一首'){
            $(this).attr({'src':'images/mis_nextone.png'});
        }else if(title=='播放'){
            $(this).attr({'src':'images/mis_playone.png'});
        }else if(title=='删除'){
            $(this).attr({'src':'images/mis_clearone.png'});
        }else if(title=='exit'){
            $(this).attr({'src':'images/mis_exitone.png'});
        }else if(title=='暂停'){
            $(this).attr({'src':'images/mis_stopone.png'});
        }  else if(title=='now'){
            $(this).attr({'src':'images/mis_nowplay.png'});
        } else{
            $(this).attr({'src':'images/mis_addone.png'});
        }
    });
//    鼠标移入/移出歌曲列表
    $('.playSong ul').delegate('li','mouseenter',function(){
        $(this).css({'background':'#121212','color':'#fff','cursor':'pointer'});
        $(this).find('.playSongCtrl').show();
    });
    $('.playSong ul').delegate('li','mouseleave',function(){
        $(this).css({'background':'#1f1e1c','color':'darkgray'});
        $(this).find('.playSongCtrl').hide();
    });
//    歌曲播放列表中样式初始化
    function songLiInit(){
        $('.playSong li').css({'background':'#1f1e1c','color':'darkgray'});
        $('.playSong div').css({'background':'','color':''});
        $('.playNow').hide();
    }
//    获取、设置歌名和歌手名
    function setName(i){
        let songName=$('.playSong li').eq(i).find('div').eq(0).html();
        let singerName=$('.playSong li').eq(i).find('div').eq(1).html();
        let songTime=$('.playSong li').eq(i).find('div').eq(2).html();
        let songSrc=$('.playSingerImg').eq(i).html();
        let songLrc=$('.pLrc').eq(i).html();
        //console.log($('.playSingerImg').eq(i).html())
        $('.playSong').data({'songName':songName});
        $('.playSong').data({'singerName':singerName});
        $('.playSong').data({'songTime':songTime});
        $('.playSong').data({'songSrc':songSrc});
        $('.playSong').data({'songLrc':songLrc});
        $('.misName label').eq(0).html(songName);
        $('.misName label').eq(1).html(singerName);
        $('.playListRight .playHead').html(songName);
    }
//    点击列表中歌曲
    $('.playSong ul').delegate('li','click',function(){
        //样式初始化
        songLiInit();
        //样式设置
        $(this).find('div').css({'background':'#1B1916','color':'#fff'});
        $(this).find('.playNow').show();
    //获取歌曲信息
        let i=$(this).index('.playSong li');
        $('.playLyric').scrollTop=0;
        setName(i);
            //console.log(data);
            $('#playNow').attr({'src':$('.playSong').data('songSrc')});
        //console.log($('.playSong').data('songSrc'));
        //    $('#playNow').get(0).load();
            $('#playNow').get(0).play();
            playStatus="playing";
            staticTime();
            $('.misControl img').eq(1).attr({'src':'images/mis_stopone.png','title':'暂停'});
            process();
    });
    //    切换播放状态
    $('.misList img').eq(1).click(function(){
        if($(this).data('num')==undefined){
            $(this).data({'num':0});
        }
        if($(this).data('num')==0){
            $(this).attr({'src':'images/mis_singleone.png','title':'单曲'});
            $('.playType').html('单曲');
            $(this).data({'num':1});
        }else if($(this).data('num')==1){
            $(this).attr({'src':'images/mis_loopone.png','title':'循环'});
            $('.playType').html('循环');
            $(this).data({'num':2});
        }else{
            $(this).attr({'src':'images/mis_randomone.png','title':'随机'});
            $('.playType').html('随机');
            $(this).data({'num':0});
        }
        $('.playType').show();
        $(this).bind('mouseleave',function(){
            setTimeout(function(){
                $('.playType').hide();
            },2000);
        })
    });
//    点击列表，展开歌曲列表
    $('.misList img').eq(2).click(function(){
        //console.log($(this).data('num'))
        if(($(this).data('num')==undefined)||($(this).data('num')==1)){
            $('.playList').show();
            $(this).data({'num':0});
        }else{
            $('.playList').hide();
            $(this).data({'num':1});
        }
        if(playStatus==undefined){
            $('.playSong li').eq(0).find('div').css({'background':'#1B1916','color':'#fff'});
            $('.playSong li').eq(0).find('.playNow').show();
        }
    });
//    点击音量按钮
    var volume;
    $('.ctrlVolume').click(function(){
        clearTimeout(volume);
        //console.log($(this).data('num'))
        let nowVolume=$('#playNow').get(0).volume;
        $('.vSlider').css({'height':nowVolume*$('.volumeBox').height()});
        if($(this).data('num')==undefined||$(this).data('num')==1){
            $('.volumeBox').show();
            $('.ctrlVolume').data({'num':0});
            volume=setTimeout(function(){
                $('.volumeBox').hide();
                $('.ctrlVolume').data({'num':1});
            },3000)
        }else{
            $('.volumeBox').hide();
            $(this).data({'num':1});
        }
    });
//    点击叉关闭列表
    $('.playExit img').click(function(){
        $('.playList').hide();
        $('.misList img').eq(2).data({'num':1});
    });
//    删除歌曲
//    全部删除
    $('.playClear img').click(function(){
        $('.playSong ul').empty();
        $('#playNow').get(0).pause();
        $('.misNum').html(0);
        staticTime();
        playStatus=undefined;
    });
//    haha
    $('.playSongCtrl').delegate('img:eq(0)','click',function(){
        alert('杜小康哈哈哈哈哈');
        return false;
    })
//    删除选中的歌曲
    var playStatus;
    $('.playSongCtrl').delegate('img:eq(1)','click',function(){
        $('.misNum').html($('.playSong li').length-1);
        let li=$(this).parent().parent();
        //console.log(li.index('.playSong ul li'));
        //console.log($('.playSong ul li').length);
        if($(this).parent().next().css('display')=="none"){
            li.remove();
        }else{
            if(li.index('.playSong ul li')!=($('.playSong ul li').length-1)){
                if($('#playNow').get(0).paused==true){
                    playStatus="paused";
                    staticTime();
                    li.next().find('div').css({'background':'#1B1916','color':'#fff'});
                    li.next().find('.playNow').show();
                } else{
                    playStatus="playing";
                    li.next().click();
                }

            }else if(li.index('.playSong ul li')==0){
                playStatus="paused";
                $('#playNow').get(0).pause();
            } else{
                if($('#playNow').get(0).paused==true){
                    playStatus="paused";
                    staticTime();
                    li.prev().find('div').css({'background':'#1B1916','color':'#fff'});
                    li.prev().find('.playNow').show();
                } else{
                    playStatus="playing";
                    li.prev().click();
                }
            }
            li.remove();
        }
    });
//    控制歌曲播放(上一首、下一首、播放暂停)
    //--上一首
    $('.misControl img').eq(0).click(function(){
        preAndnext("prev");
    });
    //--下一首
    $('.misControl img').eq(2).click(function(){
        preAndnext("next");

    });
//    --播放/暂停
    var dur;
    //状态
    var statue;
    $('.misControl img').eq(1).click(function(){
        //console.log($('.slider').css('width'));
        if($(this).attr('title')=='播放'){
            $(this).attr({'src':'images/mis_stopone.png','title':'暂停'});
            let noneNum=0;
            $('.playSong li').each(function(){
                if($(this).find('.playNow').css('display')!='none'){
                    //console.log(nowprocess)
                    //if(nowprocess>0||$('.slider').width()!=0){
                    if(isNaN($('#playNow').get(0).duration)||nowprocess==1||nowprocess==2){
                        //console.log('1')
                        //if(nowprocess>0){
                        //    nowprocess=$('.slider').width()+1;
                        //}
                        nowprocess=0;
                            $('#playNow').attr({'src':$(this).find('.playSong').data('songSrc')});
                            $('#playNow').get(0).load();
                            //console.log(data);
                            if(isNaN($('#playNow').get(0).duration)){
                                dur=setInterval(function(){
                                    //console.log($('#playNow').get(0).duration);
                                    if($('#playNow').get(0).duration>0){
                                        clearInterval(dur);
                                        let cTime=($('.slider').width()/$('.processor').width())*$('#playNow').get(0).duration;
                                        //window.clearInterval(timeer);
                                        //window.clearInterval(styleer);
                                        //clearInterval(playLrc);
                                        //减去定时器
                                        clearNumber('timeerNum');
                                        clearNumber('styleerNum');
                                        clearNumber('playLrcNum');
                                        $('#playNow').get(0).currentTime=cTime;
                                        //console.log($('.slider').css('width'));
                                        $('#playNow').get(0).play();
                                        process();
                                    }
                                },1000);
                            }else{
                                let cTime=($('.slider').width()/$('.processor').width())*$('#playNow').get(0).duration;
                                //window.clearInterval(timeer);
                                //window.clearInterval(styleer);
                                //clearInterval(playLrc);
                                //减去定时器
                                clearNumber('timeerNum');
                                clearNumber('styleerNum');
                                clearNumber('playLrcNum');
                                $('#playNow').get(0).currentTime=cTime;
                                $('#playNow').get(0).play();
                                process();
                            }
                        //stoper=setInterval(function(){

                        //})
                    }
                    //else if(nowprocess==undefined) {
                    //    $('#playNow').get(0).play();
                    //}
                    else if(($('#playNow').get(0).duration>0&&$('#playNow').get(0).paused==true)&&(nowprocess==0)){
                        $('#playNow').get(0).play();
                        nowprocess=0;
                    }else{
                        $(this).click();
                        nowprocess=0;
                    }
                    return false;
                }
                noneNum++;
                if(noneNum==($('.playSong li').length)){
                    //let songName=$('.playSong li').eq(0).find('div').eq(0).html();
                    //let singerName=$('.playSong li').eq(0).find('div').eq(1).html();
                    //$('.misName label').eq(0).html(songName);
                    //$('.misName label').eq(1).html(singerName);
                    //staticTime();
                    $('.playSong li').eq(0).click();
                }
            })
        }else{
            $(this).attr({'src':'images/mis_playone.png','title':'播放'});
            //window.clearInterval(timeer);
            //window.clearInterval(styleer);
            //window.clearInterval(playLrc);
            //清除定时器
            clearNumber('timeerNum');
            clearNumber('styleerNum');
            clearNumber('playLrcNum');
            $('#playNow').get(0).pause();
        }

    });

//    歌曲播放完毕
//    console.log($('#playNow').get(0).ended);
    $('#playNow').bind('ended',function(){
        let playType=$('.misList img').eq(1).attr('title');
        //console.log(playType);
        if(playType=='循环'){
             $('.playSong li').each(function(i){
                 //console.log($(this).find('.playNow').css('display'))
                 if($(this).find('.playNow').css('display')!='none'){
                     //console.log($(this).index('.playSong li'));
                     if($(this).index('.playSong li')!=($('.playSong li').length-1)){
                         $(this).next().click();
                     }else if($(this).index('.playSong li')==0){
                         $(this).click();
                     }
                     else{
                        $('.playSong li').eq(0).click();
                     }
                     return false;
                 }
             })
        }else if(playType=='单曲'){
            $('.playSong li').each(function(i){
                if($(this).find('.playNow').css('display')!='none'){
                    $(this).click();
                    return false;
                }
            });
        //    随机播放
        }else{
            $('.playSong li').each(function(i){
                if($(this).find('.playNow').css('display')!='none'){
                    let index=i;
                    let number=Math.floor(Math.random()*($('.playSong li').length));
                    //console.log('number:'+number);
                    $('.playSong li').eq(number).click();
                    return false;
                }
            });
        }
    });
//    点击进度条-播放音乐
//    var aa=100;
    $('.processor').click(function(e){
        e=e||window.event;
        //let sWidth=e.clientX-200;
        let oldX=$(this).offset().left;
        //alert(oldX)
        let sWidth=e.clientX-oldX;
        //clearInterval(timeer);
        //clearInterval(styleer);
        //clearInterval(playLrc);
        //清除定时器
        clearNumber('timeerNum');
        clearNumber('styleerNum');
        clearNumber('playLrcNum');
        if(sWidth>$('.processor').width()){
            sWidth=$('.processor').width();
        }
        $('.slider').css({'width':sWidth+'px'});
        nowprocess=1;
        if($('#playNow').get(0).duration>0&&$('#playNow').get(0).paused==false){
            //console.log('1')
            let cTime=($('.slider').width()/$('.processor').width())*$('#playNow').get(0).duration;
            //window.clearInterval(timeer);
            //window.clearInterval(styleer);
            //clearInterval(playLrc);
            //清除定时器
            clearNumber('timeerNum');
            clearNumber('styleerNum');
            clearNumber('playLrcNum');
            //setInterval(function(){
            //
            //},1000)
            //$('#playNow').get(0).currentTime=cTime;
            //if('seekable' in $('#playNow').get(0)){
            //    alert('aaa')
            //}else{
            //    alert('bbb')
            //}
            //$('#playNow').get(0).currentTime=aa;

            //$('#playNow').get(0).seekable.end(cTime);
            //console.log(aa);
            //console.log($('#playNow').get(0).seekable.end());
            $('#playNow').get(0).currentTime=cTime;
            //console.log($('#playNow').get(0).currentTime)
            //setTimeout(function(){
            //
            //
            //},3000);

            //$('#playNow').get(0).addEventListener("canplay",function() {$('#playNow').get(0).currentTime=cTime;});

            process();
        }
    });
//    离开控制音量条
    $('.volumeBox').mouseleave(function(){
        volume=setTimeout(function(){
            $('.volumeBox').hide();
            $('.ctrlVolume').data({'num':1});
        },3000)
    });
//    点击进度条-控制音量
    $('.volumeBox').click(function(e){
        e=e||window.event;
        //let sWidth=e.clientX-200;
        let oldY=$(this).offset().top;
        //alert(oldX)
        let sHeight=$(this).height()-(e.clientY-oldY);
        if(sHeight>$('.volumeBox').height()){
            sHeight=$('.volumeBox').height();
        }
        $('.vSlider').css({'height':sHeight+'px'});
        setVolume();
    });
//    拖拽进度条-播放音乐
$('.controler').bind('mousedown',function(){
    let obj=$('.ctrlBox');
    ctrlDown(obj,1);
});
//    拖拽进度条-控制音量
$('.vCtrl').bind('mousedown',function(){
        let obj=$('.vCbox');
        ctrlDown(obj,2);
    });
var nowprocess=0;
 function ctrlDown(obj,num){
     //console.log('按下');
     obj.css({'cursor':'pointer'});
     obj.bind('mousemove',move);
     obj.bind('mouseup',stop);
     obj.bind('mouseleave',stop);
         function move(event){
             //console.log("移动");
             event=event || window.event;
             //let newX=event.clientX;
             //清除播放进度条定时器
             if(num==1){
                 //clearInterval(styleer);
                 clearNumber('styleerNum');
                 //let newWidth=event.clientX-210;
                 let newWidth=event.clientX-$('.processor').offset().left;
                 //console.log(newX);
                 //console.log(newWidth)
                 if(newWidth>$('.processor').width()){
                     newWidth=$('.processor').width();
                 }
                 $('.slider').css({'width':newWidth+'px'});
                 return false;
             }else{
                 //console.log(2)
                 let newHeight=$('.volumeBox').height()+($('.volumeBox').offset().top-event.clientY);
                 //console.log(newHeight)
                 //console.log(newX);
                 //console.log(newWidth)
                 if(newHeight>$('.volumeBox').height()){
                     newHeight=$('.volumeBox').height();
                 }
                 $('.vSlider').css({'height':newHeight+'px'});
                 return false;
             }

         }
         function stop(event){
             event=event || window.event;
             //console.log("stop")
             obj.css({'cursor':''});
             obj.unbind('mousemove');
             obj.unbind('mouseup');
             obj.unbind('mouseleave');
             if(num==1){
                 checkPlay();
             }else{
                 setVolume();
             }
         }
 }

    //滚动歌词
    //var lrctime=new Array();
    //var lrctext=new Array();
    var lyric=new Array();
    var playLrc;
function playLyric(){
    //let songName=$('.misName label').eq(0).html();
    //let singerName=$('.misName label').eq(1).html();
        let lrc=$('.playSong').data('songLrc');
        let lyricText=$.ajax({//读取lrc内容
            url:lrc,
            async:false
        });
        //通过'/n'对内容进行分割
        let lyricArray=lyricText.responseText.split('\n');
        //console.log(lyric);
        //对数组清空
        lyric=[];
        //匹配播放时间,对时间戳和歌词进行存储
        for(var i=0;i<lyricArray.length;i++){
            //匹配满足正则时间戳,进行decode
           let lrctime=decodeURIComponent(lyricArray[i].match(/\[\d*:\d*((\.|\:)\d*)*\]/g));
            //用时间进行分割，获取歌词
            let lrctext=decodeURIComponent(lyricArray[i].split(lrctime));
            //将时间转换为秒
            let min = Number(String(lrctime.match(/\[\d*/i)).slice(1));
            let sec = Number(String(lrctime.match(/\:\d*/i)).slice(1));
            lrctime = min * 60 + sec;
            //存储歌词和时间到对象，并存在数组中
            let content={'lrctime':lrctime,'lrctext':lrctext.substring(1)};
            //for(var i=0;i<lyric.length;i++){
            //    if(lrctime.indexOf(lyric[i].lrctime)==false){
            //        console.log('有了')
            //
            //    }
            //}
            lyric.push(content);
            //console.log(lyric[i]);
        }
        //console.log(lyric);
        //for(var i=0;i<lrctext.length;i++){
        //    //lrctext[i].slice(1);
        //    //console.log( lrctext[i].slice(1))
        //}
        //console.log(lrctext);
        //将歌词添加到歌词显示面板
        $('.playLyric ul').html("");
        //console.log($('.playLyric ul').html())
        for(var i=0;i<lyric.length;i++){
            let html="<li>"+lyric[i].lrctext+
                "</li>";
            $('.playLyric ul').append(html);
        }
        //console.log($('.playLyric ul').html())
// 滚动歌词
        //高亮播放的歌词
        playLrc=setInterval(lrcScrolltop,1000);
        setNumber('playLrcNum');

};
    $('.playLyric').scroll(function(){
        if($('.playLyric').scrollTop()%25!=0){
            //$('.playLyric').data({'lrcNum':0});
            //clearInterval(playLrc);
            clearNumber('playLrcNum');
            setTimeout(function(){
                //console.log($('#playNow').get(0).paused)
                if($('#playNow').get(0).paused==false){
                    //alert('1')
                    //console.log('清楚')
                    //console.log($('#playNow').playLrcNum);
                    playLrc=setInterval(lrcScrolltop,1000);
                    //累加定时器
                    setNumber('playLrcNum');
                }
            },3000)
        }

    });
    //$('#playNow').get(0).volume=1;
//获取随机数
//    for(var i=0;i<100;i++){
//        var x=Math.floor(Math.random()*(100+1)+0)
//        console.log(x)
//    }

//    共用函数+++++++++++++++++++++++++++++++++++++++
//
    //给播放器添加一个data，lrcnum计算该定时器个数;
    function setNumber(num){
        if(num=='playLrcNum'){
            if($('#playNow').data('playLrcNum')==undefined){
                $('#playNow').data({'playLrcNum':1});
            }else{
                $('#playNow').data({'playLrcNum':$('#playNow').data('playLrcNum')+1})
            }
            //console.log('playLrcNum：'+$('#playNow').data('playLrcNum'));
        }
        if(num=='styleerNum'){
            if($('#playNow').data('styleerNum')==undefined){
                $('#playNow').data({'styleerNum':1});
            }else{
                $('#playNow').data({'styleerNum':$('#playNow').data('styleerNum')+1})
            }
            //console.log('styleerNum：'+$('#playNow').data('styleerNum'));
        }
        if(num=='timeerNum'){
            if($('#playNow').data('timeerNum')==undefined){
                $('#playNow').data({'timeerNum':1});
            }else{
                $('#playNow').data({'timeerNum':$('#playNow').data('timeerNum')+1})
            }
            //console.log('timeerNum：'+$('#playNow').data('timeerNum'));
        }

    }
//  清除计时器/定时器
    function clearNumber(num){
        if(num=='playLrcNum'){
            for(var i=0;i<$('#playNow').data('playLrcNum');i++){
                $('#playNow').data({'playLrcNum':$('#playNow').data('playLrcNum')-1});
                clearInterval(playLrc);
            }
            //console.log('playLrcNum：'+$('#playNow').data('playLrcNum'));
        }
        if(num=='styleerNum'){
            for(var i=0;i<$('#playNow').data('styleerNum');i++){
                $('#playNow').data({'styleerNum':$('#playNow').data('styleerNum')-1});
                clearInterval(styleer);
            }
            //console.log('styleerNum：'+$('#playNow').data('styleerNum'));
        }
        if(num=='timeerNum'){
            for(var i=0;i<$('#playNow').data('timeerNum');i++){
                $('#playNow').data({'timeerNum':$('#playNow').data('timeerNum')-1});
                clearInterval(timeer);
            }
            //console.log('timeerNum：'+$('#playNow').data('timeerNum'));
        }

    }

//    计时器/定时器函数-设置歌词面板的scrollTop和高亮颜色
    function lrcScrolltop(){
        if($('#playNow').get(0).duration>0&&$('#playNow').get(0).paused==false){
            for(var i=0;i<lyric.length;i++){
                //console.log('time:'+lyric[i].lrctime);
                //console.log('currentTime:'+$('#playNow').get(0).currentTime);
                if(lyric[i].lrctime==parseInt($('#playNow').get(0).currentTime)){
                    $('.playLyric li').eq(i).css({'color':'red'});
                    $('.playLyric li').not($('.playLyric li').eq(i)).css({'color':'#fff'});
                    //console.log($('.playLyric li').scrollTop())
                    if(i>=5){
                        $('.playLyric').scrollTop(25*(i-4));
                    }
                    if($('.playLyric').scrollTop()>=25*$('.playLyric').height()){
                        //clearInterval(playLrc);
                        clearNumber('playLrcNum');
                    }
                    //console.log($('.playLyric li').scrollTop())
                }
            }
        }
    }
    //    计时器/定时器函数-设置播放的时间
    function setPlayTime(){
        let firstDuration=$('#playNow').get(0).duration;
        let currentTime=timeNow($('#playNow').get(0).currentTime);
        let timeAll=timeNow($('#playNow').get(0).duration);
        allDuration=$('#playNow').get(0).duration;
        //console.log(allDuration)
        //    缓冲进度条
        let timeRangers=$('#playNow').get(0).buffered;
        let bufferNow=$('.buffbar').width();
        if(isNaN(firstDuration)==false){
            bufferNow=timeRangers.end(0)/$('#playNow').get(0).duration*$('.processor').width();
        }
        $('.buffbar').css({'width':bufferNow+'px'});
        //console.log(allDuration);
        $('.songTime label').eq(0).html(currentTime);
        $('.songTime label').eq(1).html('/'+timeAll);

        //if(isNaN(firstDuration)){
        //    $('.buffbar').css({'width':bufferNow+'px'});
        //}else{
        //}
        if(($('#playNow').get(0).currentTime+1)>=$('#playNow').get(0).duration){
            //window.clearInterval(timeer);
            //console.log('完毕');
            //$('.slider').css({'width':'0px'});
            //$('.buffbar').css({'width':'0px'});
            staticTime();
        }
    }
    //    计时器/定时器函数-设置滑动条
    function setSlider(){
        //let firstDuration=$('#playNow').get(0).duration;
        //播放进度条
        //if(isNaN(firstDuration)||firstDuration==0){
        //    console.log('阿萨德发射点发')
        //    $('.slider').css({'width':processNow+'px'});
        //}else{
        let processNow=$('.slider').width();
        //console.log('slider'+processNow);
        //if(isNaN(firstDuration)==false){
        //console.log('current:'+$('#playNow').get(0).currentTime)
        processNow=($('#playNow').get(0).currentTime/$('#playNow').get(0).duration)*$('.processor').width();
        //}
        //console.log('slider'+processNow);
        $('.slider').css({'width':processNow+'px'});
        //console.log('slider'+processNow);
        //}
        if(($('#playNow').get(0).currentTime+1)>=$('#playNow').get(0).duration){
            //window.clearInterval(styleer);
            //console.log('完毕');
            //$('.slider').css({'width':'0px'});
            //$('.buffbar').css({'width':'0px'});
            staticTime();
        }
    }
//    设置播放的音量大小
    function setVolume(){
        clearTimeout(volume);
        let nowVolume;
        let sHeight=$('.vSlider').height();
        //console.log(sHeight);
        //if(sHeight<=100){
            nowVolume=sHeight/$('.volumeBox').height();
        //}else{
        //    console.log('sadf')
        //    nowVolume=0;
        //}
        $('#playNow').get(0).volume=nowVolume;
    }
//判断是否播放音乐
    function checkPlay(){
        //console.log($('#playNow').get(0).duration)
        if((isNaN($('#playNow').get(0).duration)==false)&&($('#playNow').get(0).paused==false)){
            let cTime=(parseInt($('.slider').css('width'))/$('.processor').width())*$('#playNow').get(0).duration;
            //window.clearInterval(timeer);
            //window.clearInterval(styleer);
            //clearInterval(playLrc);
            //清除定时器
            //clearNumber('timeerNum');
            //clearNumber('styleerNum');
            //clearNumber('playLrcNum');
            $('#playNow').get(0).currentTime=cTime;
            process();
        }else{
            nowprocess=1;
        }
    }

// 上一首/下一首
    function preAndnext(who){
        let noneNum=0;
        nowprocess=2;
        $('.playSong li').each(function(i){
            //console.log('qwe')
            //console.log('i:'+i);
            //console.log($('.playSong li').eq(i).find('.playNow').css('display'))
            if($('.playSong li').eq(i).find('.playNow').css('display')=='block'){
                //console.log('qwe2')
                //console.log('i2:'+i);
                //console.log('2'+$('.playSong li').eq(i).find('.playNow').css('display'))
                //console.log($(this).index('.playSong li'));
                let li=$('.playSong li').eq(i);
                //样式初始化
                //$('.playSong li').css({'background':'#1f1e1c','color':'darkgray'});
                //$('.playSong div').css({'background':'','color':''});
                //$('.playNow').hide();
                songLiInit();
                if(who=='next'){
                    //当前li不是列表最后一个
                    //console.log('i:'+i)
                    //console.log('liIndex:'+li.index('.playSong li'))
                    //console.log($('.playSong li').length-1)
                    if(li.index('.playSong li')!=$('.playSong li').length-1){
                        //console.log($('#playNow').get(0).paused)
                        //设置显示的歌曲和歌手名
                        setName(li.index('.playSong li')+1);
                        if($('#playNow').get(0).paused==true){
                            //滚动条初始化，清除计时器
                            staticTime();
                            //设置选中歌曲样式
                            li.next().find('div').css({'background':'#1B1916','color':'#fff'});
                            li.next().find('.playNow').show();
                        } else{
                            //console.log('love');
                            //console.log(i);
                            li.next().click();
                        }
                    }else{//当前li是列表中最后一个
                        //console.log('最后一个')
                        setName(0);
                        //判断是否播放
                        if($('#playNow').get(0).paused==true){
                            $('.playSong li').eq(0).find('div').css({'background':'#1B1916','color':'#fff'});
                            $('.playSong li').eq(0). find('.playNow').show();
                        }else{
                            $('.playSong li').eq(0).click();
                        }
                    }
                }else{
                    //当前li不是列表第一一个
                    if(li.index('.playSong li')!=0){
                        //设置显示的歌曲和歌手名
                        setName(li.index('.playSong li')-1);
                        if($('#playNow').get(0).paused==true){
                            //滚动条初始化，清除计时器
                            staticTime();
                            //设置选中歌曲样式
                            li.prev().find('div').css({'background':'#1B1916','color':'#fff'});
                            li.prev().find('.playNow').show();
                        } else{
                            li.prev().click();
                        }
                    }else{//当前li是列表中最后一个
                        setName($('.playSong li').length-1);
                        //判断是否播放
                        if($('#playNow').get(0).paused==true){
                            $('.playSong li').eq($('.playSong li').length-1).find('div').css({'background':'#1B1916','color':'#fff'});
                            $('.playSong li').eq($('.playSong li').length-1). find('.playNow').show();
                        }else{
                            $('.playSong li').eq($('.playSong li').length-1).click();
                        }
                    }
                }
                //---
                //if(li.index('.playSong li')!=indexOne){
                //    if(who=="next"){
                //        staticName(li.index('.playSong li')+1);
                //        if($('#playNow').get(0).paused==true){
                //            staticTime();
                //            li.next().find('div').css({'background':'#1B1916','color':'#fff'});
                //            li.next().find('.playNow').show();
                //        } else{
                //            li.next().click();
                //        }
                //    }else{
                //        staticName(li.index('.playSong li')-1);
                //        if($('#playNow').get(0).paused==true){
                //            staticTime();
                //            li.prev().find('div').css({'background':'#1B1916','color':'#fff'});
                //            li.prev().find('.playNow').show();
                //        } else{
                //            li.prev().click();
                //        }
                //    }
                //}else{
                //    let songName=$('.playSong li').eq(indexTwo).find('div').eq(0).html();
                //    let singerName=$('.playSong li').eq(indexTwo).find('div').eq(1).html();
                //    $('.misName label').eq(0).html(songName);
                //    $('.misName label').eq(1).html(singerName);
                //    $('.playListRight .playHead').html(songName);
                //    if($('#playNow').get(0).paused==true){
                //        staticTime();
                //        $('.playSong li').eq(indexTwo).find('div').css({'background':'#1B1916','color':'#fff'});
                //        $('.playSong li').eq(indexTwo).find('.playNow').show();
                //    } else{
                //        $('.playSong li').eq(indexTwo).click();
                //    }
                //}
                return false;
            }
            noneNum++;

            if(noneNum==$('.playSong li').length){
                //console.log(111111)
                playStatus="paused";
                staticTime();
                if(who=="next"){
                    setName(0);
                    $('.playSong li').eq(0).find('div').css({'background':'#1B1916','color':'#fff'});
                    $('.playSong li').eq(0).find('.playNow').show();
                }else{
                    setName($('.playSong li').length-1);
                    $('.playSong li').eq($('.playSong li').length-1).find('div').css({'background':'#1B1916','color':'#fff'});
                    $('.playSong li').eq($('.playSong li').length-1).find('.playNow').show();
                }
            }
        })
    }
    ////修改歌名和歌手名字
    //function staticName(number){
    //    let songName=$('.playSong li').eq(number).find('div').eq(0).html();
    //    let singerName=$('.playSong li').eq(number).find('div').eq(1).html();
    //    $('.misName label').eq(0).html(songName);
    //    $('.misName label').eq(1).html(singerName);
    //    $('.playListRight .playHead').html(songName);
    //}
    //歌曲播放时获取当前时间与总时间
    var timeNum=0;
    var timeer;
    var styleer;
    var allDuration;
    function process(){
         if(timeNum==0){
             timeNum=1;
             //let firstDuration=$('#playNow').get(0).duration;
             //定时器,设置样式
             styleer=setInterval(setSlider,1000);
             //定时器,获取当前播放时间和总时间/缓冲进度条
             timeer=setInterval(setPlayTime,1000);
             //累加定时器
             setNumber('styleerNum');
             setNumber('timeerNum');
             playLyric();
             //加定时器
             //setNumber(playLrcNum);
         } else{
             //window.clearInterval(timeer);
             //window.clearInterval(styleer);
             //$('.slider').css({'width':'0px'});
             //$('.buffbar').css({'width':'0px'});
             //console.log('num=2');
             staticTime();
             timeNum=0;
             process();
         }
    }
        //共用的获取进度显示函数
    //function nowTimeAndAllTime(processNow,bufferNow){
    //    //let firstDuration=$('#playNow').get(0).duration;
    //    //定时器,设置样式
    //    styleer=setInterval(setSlider,1000);
    //    //定时器,获取当前播放时间和总时间/缓冲进度条
    //    timeer=window.setInterval(setPlayTime,1000);
    //    //累加定时器
    //    setNumber('styleerNum');
    //    setNumber('timeerNum');
    //}
    //将时间转化为分钟和秒的格式
    function timeNow(number){
        let minute=parseInt(number/60);
        let second=parseInt(number%60);
        minute=minute>=10?minute:'0'+minute;
        second=second>=10?second:'0'+second;
        let time=minute+':'+second;
        return time;
    }
//    为播放歌曲时的时间显示
    var staticenum=0;
    ////清除样式
    //function clearS(){
    //
    //}
    function staticTime(){
        //staticenum++;
        //console.log(staticenum);

        //console.log('static')
        //clearInterval(timeer);
        //clearInterval(styleer);
        //clearInterval(playLrc);
        //清除定时器
        clearNumber('styleerNum');
        clearNumber('timeerNum');
        clearNumber('playLrcNum');
        if(nowprocess==2){
            $('.slider').css({'width':'0px'});
            $('.buffbar').css({'width':'0px'});
        }
        //nowprocess=0;
        //$('.controler').css({'left':50+'px'});
        $('.songTime label').eq(0).html("00:00");
        $('.songTime label').eq(1).html('/00:00');
        //console.log($('#playNow').get(0).duration)
    }
    $('#playNow').get(0).load();
});