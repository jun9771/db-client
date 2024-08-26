//axois로 api호출 swlist에 데이터 집어넣고 정리후 출력

import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from  'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

function SoftwareList(props) {
    const [append_SwList, setAppend_SwList] = useState([]);

    let callListApi = async () => {
        axios.post('/api/tool/swtool?type=list', {

        }).then(response => {
            try {
                let result = [];
                let SwToolList = response.data;
                for(let i = 0; i < SwToolList.json.length; i++) {
                    let data = SwToolList.json[i];
                    let date = data.reg_date;
                    let year = date.substr(0, 4);
                    let month= date.substr(4, 2);
                    let day = date.substr(6, 2);
                    let reg_date = year + '.' + month + '.' + day;

                    result.push(
                        <tr key={i}>
                            <td>{data.swt_toolname}</td>
                            <td>{data.swt_function}</td>
                            <td>{reg_date}</td>
                            <td>
                                <Link to={'/softwareView/' + data.swt_code}>
                                    <span className="badge bg-info text-dark">수정</span>
                                </Link>
                                <a href="#n" onClick={(e) => deleteSwtool(e)}>
                                    <span id={data.swt_code} className="badge bg-danger">삭제</span>
                                </a>
                            </td>
                        </tr>
                    )
                }
                setAppend_SwList(result);
            } catch(error) {
                alert('목록작업중 오류');
            }
        }).catch(error => {
            alert('axios 호출 에러');
            return false;
        });
    };

    useEffect(() => {
        callListApi();
    },[]);

    let deleteSwtool = (e) => {
        e.preventDefault();
        //console.log('deleteSwtool()');
        let event_target = e.target
        //alert(event_target.getAttribute('id'));
        sweetalertDelete('정말 삭제하시겠습니까?', function () {
            axios.post('/api/tool/swtool?type=delete', {
                is_SwtCd: event_target.getAttribute('id')
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                callListApi()
            }).catch(error => { alert('작업중 오류가 발생하였습니다.'); return false; });
        })
    }

    let sweetalertDelete = (title, callbackFunc) => {
        Swal.fire({
            title: title,
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    '삭제되었습니다.',
                    'success'
                )
            } else {
                return false;
            }
            callbackFunc()
        })
    }

    

    return (
        <section>
            <div className="container">
                <div className="col-md-12">
                    <h2>Software Tools 목록</h2>
                    <div>
                        <Link to={'/softwareView/register'}>Tool 등록</Link>
                    </div>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>툴 이름</th>
                                    <th>기능</th>
                                    <th>등록일</th>
                                    <th>편집</th>
                                </tr>
                            </thead>
                        </table>
                        <table className="table table-striped">
                            <tbody>
                                {append_SwList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default SoftwareList;