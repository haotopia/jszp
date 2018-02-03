<?php
namespace app\User\model;

use think\Model;
use think\Db;
use think\exception;
use PHPMailer\PHPMailer\PHPMailer;
class Reset extends Model
{
    public function checkUser($user){
        $quer=Db::table('jszp_user')->where('email',$user)->find();
        if ($quer)
            return $quer['user_id'];
        else
            return null;
    }
    public function token($user_id,$token){
        $data=[
            'user_id'           =>  $user_id,
            'token'            =>  $token
        ];
        $db=DB::table('jszp_reset')->where('user_id',$user_id)->find();
        if($db){
            DB::table('jszp_reset')->where('user_id',$user_id)->delete();
        }
        $quer=Db::table('jszp_reset')->insert($data);
        if ($quer)
            return true;
        else
            return false;
    }

    function sendMail($user_id,$token){
        $mail=new PHPMailer;
        $quer=Db::table('jszp_user')->where('user_id',$user_id)->find();
        $url='http://jszp.com/public/index.php/user/reset/reset?userid='.$user_id.'&&token='.$token;

            $mail->SMTPDebug = 2;
            $mail->isSMTP();
            $mail->Host = 'smtp.163.com';
            $mail->CharSet='UTF-8';
            $mail->SMTPAuth = true;
            $mail->Username = 'ncepujszp@163.com';
            $mail->Password = 'mail2018';
            $mail->Port = 25;
            $mail->setFrom('ncepujszp@163.com', '教师招聘系统维护团队');
            $mail->addAddress($quer['email'],$quer['email']);
            $mail->isHTML(true);
            $mail->Subject = '华北电力大学（保定）电力系教师招聘系统';
            $mail->Body="
		    您好，这里是华北电力大学（保定）电力系教师招聘系统，请点击以下链接完成密码重置：
		<a href=\"$url\">$url</a>
		如果以上链接不能点击，请将以上链接复制粘贴到地址栏访问。
		如果您从未申请密码重置，对您造成的不便，敬请谅解。
	
		";
/*
        $mail->Charset="UTF-8";
        //Tell PHPMailer to use SMTP
        $mail->isSMTP();
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;
        //Ask for HTML-friendly debug output
        $mail->Debugoutput = 'html';
        //Set the hostname of the mail server
        $mail->Host = "smtp.163.com";
        //Set the SMTP port number - likely to be 25, 465 or 587
        $mail->Port = 25;
        //Whether to use SMTP authentication
        $mail->SMTPAuth = true;
        //Username to use for SMTP authentication
        $mail->Username = 'ncepujszp@163.com';
        //Password to use for SMTP authentication
        $mail->Password = 'mail2018';
        $mail->setFrom('ncepujszp@163.com');
        //Set who the message is to be sent from
        $mail->addAddress($quer['email'], $quer['email']);
        //Set the subject line
        $mail->Subject = '华北电力大学（保定）大学生创新网邮箱验证';
        //Read an HTML message body from an external file, convert referenced images to embedded,
        //convert HTML into a basic plain-text alternative body
        $mail->IsHTML=(true);
        $mail->Body="
		您好，这里是华北电力大学（保定）大学生创新网，请点击以下链接完成密码重置：
		$url
		如果以上链接不能点击，请将以上链接复制粘贴到地址栏访问。
		如果您从未申请密码重置，对您造成的不便，敬请谅解。
	
		";

        //send the message, check for errors*/
        if (!$mail->send()) {
            return "Mailer Error: " . $mail->ErrorInfo;
        }else{
            return null;
        }
    }

    public function checkRE($data){
        $quer=Db::table('jszp_reset')
            ->where('user_id',$data['user_id'])
            ->where('token',$data['token'])
            ->find();
        if($quer)
            return true;
        else
            return false;
    }

    public function reset($data){
        $saltLen=rand(6,10);
        $saltNum=rand(0,15);
        $saltDic='1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPOASDFGHJKLZXCVBNM+-=./';
        $saltChar=str_shuffle($saltDic);
        $salt=substr($saltChar,$saltNum,$saltLen);
        //加盐
        $psw=sha1($data['rePsw'].$salt);
        $db=[
            'password'          =>  $psw,
            'salt'              =>  $salt
        ];
        $quer=Db::table('jszp_user')->where('user_id',$data['user_id'])->update($db);
        if (!$quer){
            Db::table('jszp_reset')->where('user_id',$data['user_id'])->delete();
            return true;
        }else{
            return false;
        }
    }
}