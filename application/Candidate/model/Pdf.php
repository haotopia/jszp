<?php
namespace app\Candidate\model;

use think\Model;
use think\Db;
use think\Loader;
use think\facade\Env;


class Pdf extends Model
{
    public function makePDF($data){
        require Env::get('root_path') . 'extend/fpdf/fpdf.php';
        include Env::get('root_path') . 'extend/fpdf/PDF_Chinese.php';
        $pdf = new \PDF_Chinese();
        $pdf->AddGBFont('hwzs', '华文中宋');
        /*$pdf->AddGBFont('')*/
        $pdf->Open();
        $pdf->SetMargins(31.8, 25.4);
        $pdf->AddPage();

        $pdf->SetFont('hwzs', 'B', 18);
        $pdf->SetXY(75, 25.4);
        $pdf->Cell(40, 10, iconv("utf-8", "gbk", "华北电力大学电力工程系"));
        $pdf->Ln();
        $pdf->SetX(75);
        $pdf->Cell(40, 10, iconv("utf-8", "gbk", "公开招聘教师报名登记表"));
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->SetFont('hwzs', '', '10.5');
        $pdf->Cell(17, 10, iconv("utf-8", "gbk", "	姓名"), 1);
        $pdf->Cell(20, 10, iconv("utf-8", "gbk", $data['candidate_name']), 1);
        $pdf->Cell(16, 10, iconv("utf-8", "gbk", "	性别"), 1);
        $pdf->Cell(20, 10, iconv("utf-8", "gbk", $data['sex']), 1);
        $pdf->Cell(23, 10, iconv("utf-8", "gbk", "	出生年月"), 1);
        $pdf->Cell(20, 10, iconv("utf-8", "gbk", $data['dob']), 1);
        $pdf->Cell(33.5, 45, iconv("utf-8", "gbk", ""), 1);
        $pdf->Image(Env::get('root_path').'uploads/'.$data['personal_photo'],$x+116,$y,33.5,45);
        $pdf->Ln();


        $pdf->SetY(55.4);
        $pdf->Cell(17, 10, iconv("utf-8", "gbk", "	名族"), 1);
        $pdf->Cell(20, 10, iconv("utf-8", "gbk", $data['nationality']), 1);
        $pdf->Cell(16, 10, iconv("utf-8", "gbk", "	籍贯"), 1);
        $pdf->Cell(20, 10, iconv("utf-8", "gbk", $data['origo']), 1);
        $bh=10;
        if(strlen($data['birthplace'])>12){
            $bh=5;
        }
        $pdf->Cell(23, 10, iconv("utf-8", "gbk", "	出生地"), 1);
        $pdf->SetXY(127.7, 55.4);
        $pdf->MUlticell(20, $bh, iconv("utf-8", "gbk", $data['birthplace']), 1);
        $pdf->SetY(60.4);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MultiCell(17, 5, iconv("utf-8", "gbk", "	党派及\n参加时间"), 1);
        $pdf->SetXY($x + 17, $y);
        $pdf->MultiCell(20, 10, iconv("utf-8", "gbk", $data['party']), 1);
        $pdf->SetXY($x + 37, $y);
        $pdf->MultiCell(16, 5, iconv("utf-8", "gbk", "参加工\n作时间"), 1);
        $pdf->SetXY($x + 53, $y);
        $pdf->MultiCell(20, 10, iconv("utf-8", "gbk", $data['join_time']), 1);
        $pdf->SetXY($x + 73, $y);
        $pdf->MultiCell(23, 10, iconv("utf-8", "gbk", "	健康状况"), 1);
        $pdf->SetXY($x + 96, $y);
        $pdf->MultiCell(20, 10, iconv("utf-8", "gbk", $data['health_info']), 1);
        $pdf->SetXY($x + 116, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MultiCell(17, 7.5, iconv("utf-8", "gbk", "专业技术职务"), 1);
        $pdf->SetXY($x + 17, $y);
        $pth=15;
        if(strlen($data['profession_title'])>15){
            $pth=7.5;
            if(strlen($data['profession_title'])>30){
                $pth=5;
            }
        }
        $pdf->MultiCell(20, $pth, iconv("utf-8", "gbk", $data['profession_title']), 1);
        $pdf->SetXY($x + 37, $y);
        $pdf->MultiCell(16, 5, iconv("utf-8", "gbk", "从事专业及研究方向"), 1);
        $pdf->SetXY($x + 53, $y);
        $ph=15;
        if(strlen($data['profession'])>42){
            $ph=7.5;
            if(strlen($data['profession'])>84){
                $ph=5;
            }
        }
        $pdf->MulTiCell(63, $ph, iconv("utf-8", "gbk", $data['profession']), 1);
        $pdf->SetXY($x + 73, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MulTiCell(17, 10, iconv("utf-8", "gbk", "	学  历\n	学  位  "), 1);
        $pdf->SetXY($x + 17, $y);
        $pdf->MultiCell(20, 5, iconv("utf-8", "gbk", "	全日制\n	教	育  "), 1);
        $pdf->SetXY($x + 37, $y);
        $pdf->MultiCell(59, 10, iconv("utf-8", "gbk", $data['full_time_degree']), 1);
        $pdf->SetXY($x + 96, $y);
        $pdf->MultiCell(20, 5, iconv("utf-8", "gbk", "  毕业院校\n  及专业"), 1);
        $pdf->SetXY($x + 116, $y);
        $ftsh=10;
        if(strlen($data['ft_school'])>24){
            $ftsh=5;
        }
        $pdf->MultiCell(33.5, $ftsh, iconv("utf-8", "gbk", $data['ft_school']), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();

        $pdf->SetXY($x + 17, $y + 10);
        $pdf->MultiCell(20, 5, iconv("utf-8", "gbk", "  在	职\n  教	育  "), 1);
        $pdf->SetXY($x + 37, $y + 10);
        $pdf->MultiCell(59, 10, iconv("utf-8", "gbk", $data['in_service_degree']), 1);
        $pdf->SetXY($x + 96, $y + 10);
        $pdf->MultiCell(20, 5, iconv("utf-8", "gbk", "  毕业院校\n  及专业"), 1);
        $pdf->SetXY($x + 116, $y + 10);
        $insh=10;{
            if(strlen($data['ins_school'])>24)
                $insh=5;
        }
        $pdf->MultiCell(33.5, $insh, iconv("utf-8", "gbk", $data['ins_school']), 1);
        $pdf->SetXY($x + 149.5, $y + 10);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MulTiCell(17, 5, iconv("utf-8", "gbk", "现工作单位及职务"), 1);
        $pdf->SetXY($x + 17, $y);
        $pdf->MultiCell(79, 10, iconv("utf-8", "gbk", $data['occupation']), 1);
        $pdf->SetXY($x + 96, $y);
        $pdf->MultiCell(20, 5, iconv("utf-8", "gbk", "任现职时间"), 1);
        $pdf->SetXY($x + 116, $y);
        $pdf->MultiCell(33.5, 10, iconv("utf-8", "gbk", $data['in_service_time']), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MulTiCell(17, 10, iconv("utf-8", "gbk", "联系方式"), 1);
        $pdf->SetXY($x + 17, $y);
        $pdf->MultiCell(56, 10, iconv("utf-8", "gbk", $data['cell_phone']), 1);
        $pdf->SetXY($x + 73, $y);
        $pdf->MultiCell(23, 10, iconv("utf-8", "gbk", "	电子信箱"), 1);
        $pdf->SetXY($x + 96, $y);
        $pdf->MultiCell(53.5, 10, iconv("utf-8", "gbk", $data['email']), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MulTiCell(17, 5, iconv("utf-8", "gbk", "人才计划入选情况"), 1);
        $pdf->SetXY($x + 17, $y);
        $pdf->MultiCell(132.5, 10, iconv("utf-8", "gbk", $data['programme_info']), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MulTiCell(17, 5, iconv("utf-8", "gbk", "\n	∧ 主\n	从 要\n	大 学\n	学 习\n	阶 和\n	段 工\n	开 作\n	始 简\n	∨ 历\n 	"), 1);
        $pdf->SetXY($x + 17, $y);

        $exptext=explode("\n",$data['resume']);
        $la=count($exptext);
        $lap=0;
        for($i=0;$i<$la;$i++){
            $lap+=(int)(strlen($exptext[$i])/128);
        }
        $lae=$la+$lap;
        $pdf->MultiCell(132.5, 55/$lae, iconv("utf-8", "gbk", $data['resume']), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->SetXY($x, $y+55-(55/$lae));
        $pdf->MultiCell(149.5, 10, iconv("utf-8", "gbk", '主要主持项目（五项以内）'), 1);
        $pdf->SetXY($x + 149.5, $y+55-(55/$lae));
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MultiCell(12.5,10,iconv("utf-8", "gbk", ' 序号'), 1);
        $pdf->SetXY($x + 12.5, $y);
        $pdf->MultiCell(52.5,10,iconv("utf-8", "gbk", '      项目名称'), 1);
        $pdf->SetXY($x + 65, $y);
        $pdf->MultiCell(30,10,iconv("utf-8", "gbk", ' 项目性质及来源'), 1);
        $pdf->SetXY($x + 95, $y);
        $pdf->MultiCell(20,5,iconv("utf-8", "gbk", " 项目经费\n（万元）"), 1);
        $pdf->SetXY($x + 115, $y);
        $pdf->MultiCell(34.5,10,iconv("utf-8", "gbk", '   起止时间'), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();


        $pro=Db::table('jszp_project')->where('candidate_id',$data['candidate_id'])->select();
        for($i=0;$i<5;$i++) {
            if(!array_key_exists($i,$pro))
                $pro[$i]=[
                    'project_id'    =>  '  ',
                    'candidate_id'  =>  '  ',
                    'project_name'  =>  '  ',
                    'project_nature'=>  '  ',
                    'project_asset' =>  '  ',
                    'project_time'  =>  '  '
                ];
            $hn=10;
            $hna=10;
            if(strlen($pro[$i]['project_name'])>39)
                $hn=5;
            if(strlen($pro[$i]['project_nature'])>21)
                $hna=5;
            $y = $pdf->Gety();
            $x = $pdf->Getx();
            $pdf->MultiCell(12.5, 10, iconv("utf-8", "gbk", $i+1), 1);
            $pdf->SetXY($x + 12.5, $y);
            $pdf->MultiCell(52.5, $hn, iconv("utf-8", "gbk", $pro[$i]['project_name']), 1);
            $pdf->SetXY($x + 65, $y);
            $pdf->MultiCell(30, $hna, iconv("utf-8", "gbk", $pro[$i]['project_nature']), 1);
            $pdf->SetXY($x + 95, $y);
            $pdf->MultiCell(20, 10, iconv("utf-8", "gbk", $pro[$i]['project_asset']), 1);
            $pdf->SetXY($x + 115, $y);
            $pdf->MultiCell(34.5, 10, iconv("utf-8", "gbk", $pro[$i]['project_time']), 1);
            $pdf->SetXY($x + 149.5, $y);
            $pdf->Ln();
        }

        $pdf->AddPage();
        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->SetXY($x, $y);
        $pdf->MultiCell(149.5, 10, iconv("utf-8", "gbk", '代表性著作、论文情况（5 篇以内）'), 1);
        $pdf->SetXY($x+149.5, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MultiCell(12.5,15,iconv("utf-8", "gbk", ' 序号'), 1);
        $pdf->SetXY($x + 12.5, $y);
        $pdf->MultiCell(52.5,15,iconv("utf-8", "gbk", ' 著作或论文名称'), 1);
        $pdf->SetXY($x + 65, $y);
        $pdf->MultiCell(30,7.5,iconv("utf-8", "gbk", '出版单位或刊物名称'), 1);
        $pdf->SetXY($x + 95, $y);
        $pdf->MultiCell(20,5,iconv("utf-8", "gbk", " 排名（通讯作者标注*号）"), 1);
        $pdf->SetXY($x + 115, $y);
        $pdf->MultiCell(34.5,7.5,iconv("utf-8", "gbk", '是否被 SCI、EI 等收录'), 1);
        $pdf->SetXY($x + 149.5, $y+7.5);
        $pdf->Ln();

        $art=Db::table('jszp_article')->where('candidate_id',$data['candidate_id'])->select();
        for($i=0;$i<5;$i++) {
            if(!array_key_exists($i,$art))
                $art[$i]=[
                    'ar_id'    =>  '  ',
                    'candidate_id'  =>  '  ',
                    'ar_title'  =>  '  ',
                    'ar_publish_name'=>  '  ',
                    'ar_rank' =>  '  ',
                    'ar_is_include'  =>  '  '
                ];
            $hn=10;
            $hna=10;
            if(strlen($art[$i]['ar_title'])>39)
                $hn=5;
            if(strlen($art[$i]['ar_publish_name'])>21)
                $hna=5;
            $y = $pdf->Gety();
            $x = $pdf->Getx();
            $pdf->MultiCell(12.5, 10, iconv("utf-8", "gbk", $i+1), 1);
            $pdf->SetXY($x + 12.5, $y);
            $pdf->MultiCell(52.5, $hn, iconv("utf-8", "gbk", $art[$i]['ar_title']), 1);
            $pdf->SetXY($x + 65, $y);
            $pdf->MultiCell(30, $hna, iconv("utf-8", "gbk", $art[$i]['ar_publish_name']), 1);
            $pdf->SetXY($x + 95, $y);
            $pdf->MultiCell(20, 10, iconv("utf-8", "gbk", $art[$i]['ar_rank']), 1);
            $pdf->SetXY($x + 115, $y);
            $pdf->MultiCell(34.5, 10, iconv("utf-8", "gbk", $art[$i]['ar_is_include']), 1);
            $pdf->SetXY($x + 149.5, $y);
            $pdf->Ln();
        }

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->SetXY($x, $y);
        $pdf->MultiCell(149.5, 10, iconv("utf-8", "gbk", '重要获奖情况（5 项以内）'), 1);
        $pdf->SetXY($x+149.5, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MultiCell(12.5,10,iconv("utf-8", "gbk", ' 序号'), 1);
        $pdf->SetXY($x + 12.5, $y);
        $pdf->MultiCell(45,10,iconv("utf-8", "gbk", ' 奖励名称'), 1);
        $pdf->SetXY($x + 57.5, $y);
        $pdf->MultiCell(25.5,10,iconv("utf-8", "gbk", '奖励等级'), 1);
        $pdf->SetXY($x + 83, $y);
        $pdf->MultiCell(32.5,10,iconv("utf-8", "gbk", " 授奖单位"), 1);
        $pdf->SetXY($x + 115.5, $y);
        $pdf->MultiCell(19,10,iconv("utf-8", "gbk", '  奖励年度'), 1);
        $pdf->SetXY($x + 134.5, $y);
        $pdf->MultiCell(15,10,iconv("utf-8", "gbk", '  排序'), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();

        $aw=Db::table('jszp_award')->where('candidate_id',$data['candidate_id'])->select();
        for($i=0;$i<5;$i++) {
            if(!array_key_exists($i,$aw))
                $aw[$i]=[
                    'aw_id'    =>  '  ',
                    'candidate_id'  =>  '  ',
                    'aw_name'  =>  '  ',
                    'aw_class'=>  '  ',
                    'aw_rank' =>  '  ',
                    'aw_date'  =>  '  ',
                    'aw_org'    => '    '
                ];
            $hn=10;
            $hna=10;
            $hnb=10;
            if(strlen($aw[$i]['aw_name'])>33)
                $hn=5;
            if(strlen($aw[$i]['aw_class'])>21)
                $hna=5;
            if(strlen($aw[$i]['aw_org'])>24)
                $hnb=5;
            $y = $pdf->Gety();
            $x = $pdf->Getx();
            $pdf->MultiCell(12.5,10,iconv("utf-8", "gbk", $i+1), 1);
            $pdf->SetXY($x + 12.5, $y);
            $pdf->MultiCell(45,$hn,iconv("utf-8", "gbk", $aw[$i]['aw_name']), 1);
            $pdf->SetXY($x + 57.5, $y);
            $pdf->MultiCell(25.5,10,iconv("utf-8", "gbk", $aw[$i]['aw_class']), 1);
            $pdf->SetXY($x + 83, $y);
            $pdf->MultiCell(32.5,$hnb,iconv("utf-8", "gbk", $aw[$i]['aw_org']), 1);
            $pdf->SetXY($x + 115.5, $y);
            $pdf->MultiCell(19,10,iconv("utf-8", "gbk", $aw[$i]['aw_date']), 1);
            $pdf->SetXY($x + 134.5, $y);
            $pdf->MultiCell(15,10,iconv("utf-8", "gbk", $aw[$i]['aw_rank']), 1);
            $pdf->SetXY($x + 149.5, $y);
            $pdf->Ln();
        }



        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->SetXY($x, $y);
        $pdf->MultiCell(149.5, 10, iconv("utf-8", "gbk", '获授权的重要发明专利情况（5 项以内）'), 1);
        $pdf->SetXY($x+149.5, $y);
        $pdf->Ln();

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MultiCell(12.5,10,iconv("utf-8", "gbk", ' 序号'), 1);
        $pdf->SetXY($x + 12.5, $y);
        $pdf->MultiCell(40,10,iconv("utf-8", "gbk", ' 专利名称'), 1);
        $pdf->SetXY($x + 52.5, $y);
        $pdf->MultiCell(25,10,iconv("utf-8", "gbk", '专利号'), 1);
        $pdf->SetXY($x + 77.5, $y);
        $pdf->MultiCell(17.5,5,iconv("utf-8", "gbk", " 专利授权国"), 1);
        $pdf->SetXY($x + 95, $y);
        $pdf->MultiCell(17.5,10,iconv("utf-8", "gbk", '专利权人'), 1);
        $pdf->SetXY($x + 112.5, $y);
        $pdf->MultiCell(37,10,iconv("utf-8", "gbk", '  发明人'), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();

        $pa=Db::table('jszp_patent')->where('candidate_id',$data['candidate_id'])->select();
        for($i=0;$i<5;$i++) {
            if(!array_key_exists($i,$pa))
                $pa[$i]=[
                    'pa_intable_id'    =>  '  ',
                    'candidate_id'  =>  '  ',
                    'pa_name'  =>  '  ',
                    'pa_id'=>  '  ',
                    'pa_country' =>  '  ',
                    'pa_owner'  =>  '  ',
                    'pa_inv'    => '    '
                ];
            $hn=10;
            $hna=10;
            $hnb=10;
            $hnc=10;
            if(strlen($pa[$i]['pa_name'])>30)
                $hn=5;
            if(strlen($pa[$i]['pa_country'])>12)
                $hna=5;
            if(strlen($pa[$i]['pa_owner'])>12)
                $hnb=5;
            if(strlen($pa[$i]['pa_inv'])>27)
                $hnc=5;
            $y +=10;
            $x = $pdf->Getx();
            $pdf->SetXY($x, $y);
            $pdf->MultiCell(12.5,10,iconv("utf-8", "gbk", $i+1), 1);
            $pdf->SetXY($x + 12.5, $y);
            $pdf->MultiCell(40,$hn,iconv("utf-8", "gbk", $pa[$i]['pa_name']), 1);
            $pdf->SetXY($x + 52.5, $y);
            $pdf->MultiCell(25,10,iconv("utf-8", "gbk", $pa[$i]['pa_id']), 1);
            $pdf->SetXY($x + 77.5, $y);
            $pdf->MultiCell(17.5,$hna,iconv("utf-8", "gbk", $pa[$i]['pa_country']), 1);
            $pdf->SetXY($x + 95, $y);
            $pdf->MultiCell(17.5,$hnb,iconv("utf-8", "gbk", $pa[$i]['pa_owner']), 1);
            $pdf->SetXY($x + 112.5, $y);
            $pdf->MultiCell(37,$hnc,iconv("utf-8", "gbk", $pa[$i]['pa_inv']), 1);
            $pdf->SetXY($x + 149.5, $y);
            $pdf->Ln();
        }

        $y = $pdf->Gety();
        $x = $pdf->Getx();
        $pdf->MulTiCell(12.5, 5, iconv("utf-8", "gbk", "\n	\n  个\n 人\n 简\n 介\n\n"), 1);
        $pdf->SetXY($x + 12.5, $y);

        $exptext=explode("\n",$data['intro']);
        $la=count($exptext);
        $lap=0;
        for($i=0;$i<$la;$i++){
            $lap+=(int)(strlen($exptext[$i])/131);
        }
        $lae=$la+$lap;
        $pdf->MultiCell(137, 35/$lae, iconv("utf-8", "gbk", $data['intro']), 1);
        $pdf->SetXY($x + 149.5, $y);
        $pdf->Ln();


        $save='pdfs/'.time().'.pdf';
        $pdf->output(Env::get('root_path').$save);
        $qu=DB::table('jszp_user')->where('candidate_id',$data['candidate_id'])->find();
        if($qu['pdf'])
            if(file_exists(Env::get('root_path').$qu['pdf']))
                unlink(Env::get('root_path').$qu['pdf']);
        $db = Db::table('jszp_user')->where('candidate_id', $data['candidate_id'])->update(['pdf' => $save]);
        if($db) {
            return $save;
        }
        else{
            return null;
        }

    }
}