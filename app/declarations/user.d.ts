export default interface User {
  id: string;
  memberId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  nickname?: string;
  address?: string;
  phone?: string;
  hireDate?: string;
  office?: string;
  avatar?: string;
}

/**
 * Example of User: 
 {
    "errors": [],
    "messages": [],
    "details": {
        "member_id": 5,
        "login_id": "firstmember",
        "name1": "first",
        "name2": "member",
        "tdfk_cd": "18",
        "address1": "13 RUE ROGER SALENGRO",
        "address2": "",
        "tel": "+33602734922",
        "email": "first@member.com",
        "bikou": "",
        "open_flg": 0,
        "inst_ymdhi": "2022-06-07T17:46:17+09:00",
        "update_ymdhi": "2022-06-09T12:31:52+09:00",
        "login_ok_flg": 1,
        "nickname": "nickoname",
        "order_no": 0,
        "email_send_ng_flg": 0,
        "login_ok_ymd": null,
        "ec_point": 0,
        "api_key": "c4k8cyxocm8ggk8owc04cwogg",
        "identity_id": null,
        "anonymous_token": null,
        "zip_code": "4242",
        "address3": "",
        "tel_send_ng_flg": 0,
        "payments_stripe_customer_id": null,
        "payments_stripe_subscription_id": null,
        "group_ids": [
            "1",
            "104"
        ],
        "hire_date": "2022-04-04",
        "department": "",
        "position": "",
        "pull_down": {
            "key": "1",
            "label": "Tokyo"
        },
        "notes": "",
        "profileimage": {
            "id": "5_ext_profileimage",
            "url": "https://test-site.g.kuroco.app/files/member/ext/5_profileimage.jpg?20220609123357",
            "desc": "img_9.jpg"
        },
        "multiple_check": []
    }
}

*/
