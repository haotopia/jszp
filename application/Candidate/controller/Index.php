<?php
/**
 * Created by PhpStorm.
 * User: haotopia
 * Date: 2018/1/29
 * Time: 10:51
 */

namespace app\Candidate\controller;

use think\Db;
use think\Controller;
use think\facade\Session;
use think\facade\Env;


class Index extends Controller
{
    public function index(){
        $session=Session::get('user_id');
        if (!$session){
            $this->redirect('/public/index.php/user/index/login');
        }
        $canId=model('DataOperate')->getCanId($session);
        $list=model('DataOperate')->fetchIndex($canId);
        $this->assign('list', $list);
        return $this->fetch();
    }
    public function form(){
        $session=Session::get('user_id');
        if (!$session){
            $this->redirect('/public/index.php/user/index/login');
        }
        return $this->fetch('form');
    }
    public function uploadImg(){
        /*接收照片*/
        $file=request()->file('file');//取得图片
        $info = $file->rule('date')->move('../uploads');//移动图片
        if($info) {
            $path = $info->getSaveName();//获取图片名
        }
        Session::set('photo',$path);

    }

    public function checkInput(){
        /*检查是否非正常传送数据*/
       /* if(!$_POST){
            return $this->fetch('error');
        }*/
       $user_id=Session::get('user_id');
       $photo=Session::get('photo');
        /*组装数据*/
        $candidateData=array(
            'candidate_name'                =>  $_POST['pc-main-infor']['name'],
            'sex'                 =>  $_POST['pc-main-infor']['sex'],
            'dob'                 =>  $_POST['pc-main-infor']['dob'],
            'nationality'         =>  $_POST['pc-main-infor']['nationality'],
            'origo'               =>  $_POST['pc-main-infor']['origo'],
            'birthplace'          =>  $_POST['pc-main-infor']['birthplace'],
            'party'               =>  $_POST['pc-main-infor']['party'],
            'join_time'           =>  $_POST['pc-main-infor']['join_time'],
            'work_start_time'     =>  $_POST['pc-main-infor']['work_start_time'],
            'health_info'         =>  $_POST['pc-main-infor']['health-info'],
            'profession_title'    =>  $_POST['pc-main-infor']['profession-title'],
            'profession'          =>  $_POST['pc-main-infor']['profession'],
            'full_time_degree'    =>  $_POST['pc-main-teach']['full-time-degree'],
            //'ft_major'            =>  $_POST['ft_major'],
            'ft_school'           =>  $_POST['pc-main-teach']['ft-school'],
            'in_service_degree'   =>  $_POST['pc-main-teach']['in-service-degree'],
            'ins_school'          =>  $_POST['pc-main-teach']['ins-school'],
            //'ins_major'           =>  $_POST['ins_major'],
            //'company'             =>  $_POST['pc-main-teach']['company'],
            'occupation'          =>  $_POST['pc-main-infor']['occupation'],
            'in_service_time'     =>  $_POST['pc-main-infor']['in-service-time'],
            'cell_phone'          =>  $_POST['pc-main-infor']['cell-phone'],
            'email'               =>  $_POST['pc-main-infor']['email'],
            'programme_info'      =>  $_POST['pc-main-infor']['programme-info'],
            'team'                =>  $_POST['pc-main-infor']['team'],
            'resume'               =>  $_POST['pc-main-study']['resum'],
            'intro'               =>  $_POST['pc-main-intro']['personal-intro'],
            'personal_photo'      =>   $photo
            );

        /*检查数据*/
        //检查值是否为空
        foreach ($candidateData as $v){
            if(!trim($v)||!trim($v))
                return show(0,'您还没有填完哟','');
        }
        //检查输入是否正确
        if (!filter_var($candidateData['email'], FILTER_VALIDATE_EMAIL)) {
            return show(0,'请输入正确的邮箱','');
        }
        //$saveCanData=model('DataOperate')->findData('jszp_candidate',$candidateData['candidate_name'],$candidateData['email']);
        $saveCanData=model('DataOperate')->findDataJoin($user_id);
        if($saveCanData){
            if(file_exists($_SERVER['DOCUMENT_ROOT'].'/uploads/'.$saveCanData['personal_photo']))
                unlink($_SERVER['DOCUMENT_ROOT'].'/uploads/'.$saveCanData['personal_photo']);
            model('DataOperate')->updateCanData('jszp_candidate',$saveCanData['candidate_id'],$candidateData);
        }else {
            model('DataOperate')->saveData('jszp_candidate', $candidateData);
        }
        $saveCanData=model('DataOperate')->findDataJoin($user_id);
        if(!$saveCanData)
            return show(0,'服务器数据异常','');

        $procount=0;
        while (array_key_exists($procount,$_POST['main-project'])){
            $procount++;
        }
        model('DataOperate')->isExist('jszp_project',$saveCanData['candidate_id']);
        for($i=0;$i<$procount;$i++){
            $proData=[
                'candidate_id'      =>  $saveCanData['candidate_id'],
                'project_time'      =>  $_POST['main-project'][$i]['pr_time'],
                'project_name'      =>  $_POST['main-project'][$i]['project-name'],
                'project_nature'    =>  $_POST['main-project'][$i]['project-nature'],
                'project_asset'     =>  $_POST['main-project'][$i]['project-asset']
            ];
            foreach ($proData as $v){
                if(!trim($v)||!trim($v))
                    return show(0,'您还没有填完哟','');
            }
            $saveProData=model('DataOperate')->saveData('jszp_project',$proData);
            if(!$saveProData)
                return show(0,'服务器数据异常','');
        }

        $artcount=0;
        while (array_key_exists($artcount,$_POST['main-article'])){
            $artcount++;
        }
        model('DataOperate')->isExist('jszp_article',$saveCanData['candidate_id']);
        for($i=0;$i<$artcount;$i++){
            $artData=[
                'candidate_id'       =>  $saveCanData['candidate_id'],
                'ar_is_include'         =>  $_POST['main-article'][$i]['is-include'],
                'ar_title'      =>  $_POST['main-article'][$i]['article-title'],
                'ar_publish_name'       =>  $_POST['main-article'][$i]['publish-name'],
                'ar_rank'               =>  $_POST['main-article'][$i]['rank']
            ];
            foreach ($artData as $v){
                if(!trim($v)||!trim($v))
                    return show(0,'您还没有填完哟','');
            }
            $saveArtData=model('DataOperate')->saveData('jszp_article',$artData);
            if(!$saveArtData)
                return show(0,'服务器数据异常','');
        }

        $pricount=0;
        while (array_key_exists($pricount,$_POST['main-prize'])){
            $pricount++;
        }
        model('DataOperate')->isExist('jszp_award',$saveCanData['candidate_id']);
        for($i=0;$i<$pricount;$i++){
            $priData=[
                'candidate_id'      =>  $saveCanData['candidate_id'],
                'aw_date'              =>  $_POST['main-prize'][$i]['data'],
                'aw_name'        =>  $_POST['main-prize'][$i]['prize-name'],
                'aw_class'             =>  $_POST['main-prize'][$i]['class'],
                'aw_rank'        =>  $_POST['main-prize'][$i]['price-rank'],
                'aw_org'               =>  $_POST['main-prize'][$i]['org']
            ];
            foreach ($priData as $v){
                if(!trim($v)||!trim($v))
                    return show(0,'您还没有填完哟','');
            }
            $savePriData=model('DataOperate')->saveData('jszp_award',$priData);
            if(!$savePriData)
                return show(0,'服务器数据异常','');
        }
        $patcount=0;
        while (array_key_exists($patcount,$_POST['main-patent'])){
            $patcount++;
        }
        model('DataOperate')->isExist('jszp_patent',$saveCanData['candidate_id']);
        for($i=0;$i<$patcount;$i++){
            $patData=[
                'candidate_id'      =>  $saveCanData['candidate_id'],
                'pa_name'       =>  $_POST['main-patent'][$i]['patent-name'],
                'pa_id'         =>  $_POST['main-patent'][$i]['patent-id'],
                'pa_country'    =>  $_POST['main-patent'][$i]['patent-country'],
                'pa_inv'        =>  $_POST['main-patent'][$i]['patent-inventor'],
                'pa_owner'     =>  $_POST['main-patent'][$i]['patent-holder']
            ];
            foreach ($patData as $v){
                if(!trim($v)||!trim($v))
                    return show(0,'您还没有填完哟','');
            }
            $savePatData=model('DataOperate')->saveData('jszp_patent',$patData);
            $saveCanId=model('DataOperate')->saveCanId($user_id,$saveCanData['candidate_id']);
            if(!$savePatData&&!$saveCanId)
                return show(0,'服务器数据异常','');
        }

        $getCanId=model('DataOperate')->getCanId($user_id);
        $data=model('DataOperate')->findDataById('jszp_candidate',$getCanId);
        $pdf=model('Pdf')->makePDF($data);
        if(!$pdf){
            return show(0,'报表异常','');
        }
        return show(1,'上传成功','');
    }

    function makePdf(){
        $user_id=Session::get('user_id');
        $getCanId=model('DataOperate')->getCanId($user_id);
        $data=model('DataOperate')->findDataById('jszp_candidate',$getCanId);
        $pdf=model('Pdf')->makePDF($data);
        if($pdf){
            return $this->redirect('/'.$pdf);
        }
    }
    function logout(){
        Session::delete('user_id');
        $this->redirect('/public/index.php/user/index/login');
    }

}
