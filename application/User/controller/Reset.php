<?php
namespace app\User\controller;
use think\Controller;
use think\facade\Session;

class Reset extends Controller
{
    public function index(){
        return $this->fetch('findpwd');
    }
    public function mail(){
        $user=$_POST['email'];
        $captcha=$_POST['register'];
        if (!trim($user) || !trim($user))
            return show(0, '您还没有填完哟','');
        $user_id=model('Reset')->checkUser($user);
        if(!$user_id){
            return show(0,'请输入正确邮箱','');
        }
        if(!captcha_check($captcha)){
            return show(0,'验证码不正确','');
        };
        $token=sha1($user.time());
        $save=model('Reset')->token($user_id,$token);
        if(!$save){
            return show(0,'信息异常，请稍后再试','');
        }
        $mail=model('Reset')->sendMail($user_id,$token);
        if($mail){
            return show(0,$mail,'');
        }
        else{
            return show(1,'发送成功，请前往邮箱查询','');
        }
    }
    public function reset(){
        $token=$_GET['token'];
        $user_id=$_GET['userid'];
        $data=[
            'token'        =>  $token,
            'user_id'          =>  $user_id
        ];
        $check=model('Reset')->checkRE($data);
        if (!$check){
            echo '链接已失效！';
            exit();
        }
        Session::set('userid',$user_id);
        return $this->fetch('setpwd');
    }

    public function resetPsw(){
        $user_id=Session::get('userid');
        $data=[
            'user_id'         =>  $user_id,
            'rePsw'           =>  $_POST['newpsw']
        ];
        foreach ($data as $v) {
            if (!trim($v) || !trim($v))
                return show(0, '您还没有填完哟','');
        }
        $upd=model('Reset')->reset($data);
        if (!$upd){
            return show('0','重置密码失败','');
        }
        return show('1','重置密码成功','');
    }
}