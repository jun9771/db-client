import React,{useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";  //app.jsx에 :swtcode => useParams
import Swal from 'sweetalert2'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function SoftwareView() {
    const params = useParams();
    const beforeSwtcode = params.swtcode;
    
    let navigate = useNavigate();
    let handleFileInput = () => { };

    useEffect(() => {
        if(beforeSwtcode === 'register'){
            document.querySelector('.modifyClass').style.display = 'none';
        }
        else{
            callSwToolInfoApi();
            document.querySelector('.saveClass').style.display = 'none';
        }
    });

    let callSwToolInfoApi = () => {
        axios.post('/api/tool/swtool?type=list',{
            is_Swtcode: beforeSwtcode,
        }).then(response => {
            let data = response.data.json[0];
            document.querySelector('#is_Swt_toolname').value = data.swt_toolname;
            document.querySelector('#is_Swt_demo_site').value = data.swt_demo_site;
            document.querySelector('#is_Giturl').value = data.swt_github_url;
            document.querySelector('#is_Comments').value = data.swt_comments;
            document.querySelector('#is_Swt_function').value = data.swt_function;
        }).catch(error => {alert('조회 오류'); return false;})
    };

    let submitClick = (type, e) => {
        e.preventDefault();
        let swt_toolname_checker = document.querySelector('#is_Swt_toolname').value;
        let swt_demo_site_checker = document.querySelector('#is_Swt_demo_site').value;
        let Giturl_checker = document.querySelector('#is_Giturl').value;
        let Comments_checker = document.querySelector('#is_Comments').value;
        let swt_function_checker = document.querySelector('#is_Swt_function').value;

        let fnValidate = (e) => {
            if (swt_toolname_checker === '') {
                document.querySelector('#is_Swt_toolname').setAttribute('class', 'border_validate_err')
                alert('툴 이름을 다시 확인해주세요.')
                return false;
            }
            document.querySelector('#is_Swt_toolname').removeAttribute('class');

            if (swt_demo_site_checker === '') {
                document.querySelector('#is_Swt_demo_site').setAttribute('class', 'border_validate_err')
                alert('데모 URL을 다시 확인해주세요.')
                return false;
            }
            document.querySelector('#is_Swt_demo_site').removeAttribute('class');

            if (Giturl_checker === '') {
                document.querySelector('#is_Giturl').setAttribute('class', 'border_validate_err')
                alert('Github URL을 다시 확인해주세요.')
                return false;
            }
            document.querySelector('#is_Giturl').removeAttribute('class');

            if (Comments_checker === '') {
                document.querySelector('#is_Comments').setAttribute('class', 'border_validate_err')
                alert('설명을 다시 확인해주세요.')
                return false;
            }
            document.querySelector('#is_Comments').removeAttribute('class');

            if (swt_function_checker === '') {
                document.querySelector('#is_Swt_function').setAttribute('class', 'border_validate_err')
                alert('상세기능을 다시 확인해주세요.')
                return false;
            }
            document.querySelector('#is_Swt_function').removeAttribute('class');
            return true;
        }


        if (fnValidate()) {
            const formData = new FormData(document.querySelector('#frm'));
            var Json_form = JSON.stringify(Object.fromEntries(formData));
            const response = fetch('/api/tool/swtool?type=' + type, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: Json_form,
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} 에러 발생`);
                }
                return response.json();
            }).then(body => {
                if (body.code === 'succ') {
                    if (type === 'save') {
                        sweetalertSucc('Software Tools 등록 성공', false);
                    }else if(type === 'modify'){
                        sweetalertSucc('Software Tools 수정 성공', false);
                    }
                    setTimeout(function () {
                        navigate('/softwareList');
                    }, 1500);
                } else {
                    alert('insert 오류');
                }
            }).catch(err => alert(err));
        }
        let sweetalertSucc = (title, showConfirmButton) => {
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: title,
                showConfirmButton: showConfirmButton,
                timer: 1000
            })
        };
    };

    return (
        <section>
            <div className="container">
                <div>
                    <h2>Software Tools 등록/수정</h2>
                </div>
                <div>
                    <form name="frm" id="frm" action="" method="post" >
                        <input id="is_Swtcode" type="hidden" name="is_Swtcode" />
                        <input id="is_Email" type="hidden" name="is_Email" value="guest" />
                        <input id="is_beforeSwtcode" type="hidden" name="is_beforeSwtcode" value={beforeSwtcode} />
                        <p style={{ "textAlign": "right" }}>
                            (*)표시는 필수입력사항 입니다.
                        </p>
                        <div >
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>
                                            <label htmlFor="is_Swt_toolname">툴 이름<span>(*)</span></label>
                                        </th>
                                        <td>
                                            <input type="text" name="is_Swt_toolname" id="is_Swt_toolname" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="is_Swt_demo_site">데모 URL(*)</label>
                                        </th>
                                        <td>
                                            <input type="text" name="is_Swt_demo_site" id="is_Swt_demo_site" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="is_Giturl">Github URL(*)</label>
                                        </th>
                                        <td>
                                            <input type="text" name="is_Giturl" id="is_Giturl" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="is_Comments">설명(*)</label>
                                        </th>
                                        <td>
                                            <textarea name="is_Comments" id="is_Comments" rows="" cols=""></textarea>
                                        </td>
                                    </tr>
                                    <tr className="div_tb_tr fileb">
                                        <th>
                                            메뉴얼 파일 #1
                                        </th>
                                        <td>
                                            <input type="file" id="uploadBtn1" onChange={e => handleFileInput('manual', e)} />
                                            <div id="upload_menual">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            메인 이미지
                                        </th>
                                        <td>
                                            <input type="file" id="imageSelect" onChange={e => handleFileInput('file', e)} />
                                            <div id="upload_img">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            라벨 이미지
                                        </th>
                                        <td >
                                            <input type="file" id="imageSelect2" onChange={e => handleFileInput('file2', e)} />
                                            <div id="upload_img2">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="is_Swt_function">상세 기능(*)</label>
                                        </th>
                                        <td>
                                            <textarea name="is_Swt_function" id="is_Swt_function" rows="" cols=""></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{ "marginBottom": "44px" }}>
                                <Link to={'/SoftwareList'} ><span className="badge bg-secondary">취소</span></Link>
                                <a href="" className='saveClass' onClick={(e) => submitClick('save', e)}><span className="badge bg-primary">저장</span></a>
                                <a href="" className='modifyClass' onClick={(e) => submitClick('modify', e)}><span className="badge bg-primary">수정</span></a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SoftwareView;