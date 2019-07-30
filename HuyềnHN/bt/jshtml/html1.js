// let trips = [];
let routes = [
    {
        "_id": "5b19e30ac2f97263ca61440f",
        "name": "Diêm Điền - Đông Hưng - Hà Nội",
        "createdTime": 1528423178111,
        "updatedTime": 1546679183005,
        "isDeleted": false,
        "shortName": "ĐH - HN",
        "reverseRouteID": "5b19eb4c483d396bbaef0fa6",
        "driverExp": 15000
    },
    {
        "_id": "5b19e517483d396bbaef0f8f",
        "name": "Diêm Điền - Tiền Hải - Thái Bình - Hà Nội",
        "createdTime": 1528423703985,
        "updatedTime": 1544511771990,
        "isDeleted": false,
        "shortName": "TH - HN",
        "reverseRouteID": "5b19eb930e7d82518c217d6c",
        "driverExp": 16000
    },
    {
        "_id": "5b19eb4c483d396bbaef0fa6",
        "name": "Trường Múa - Pháp Vân - Thái Bình",
        "createdTime": 1528425292271,
        "updatedTime": 1546679183004,
        "isDeleted": false,
        "shortName": "TM - TB",
        "reverseRouteID": "5b19e30ac2f97263ca61440f",
        "driverExp": 17000
    },
    {
        "_id": "5b19eb930e7d82518c217d6c",
        "name": "Gia Lâm - Pháp Vân - Thái Bình",
        "createdTime": 1528425292271,
        "updatedTime": 1544511759974,
        "isDeleted": false,
        "shortName": "GL - TB",
        "reverseRouteID": "5b19e517483d396bbaef0f8f",
        "driverExp": 18000
    }
]//khai báo mảng gồm 4 đối tượng(item) bằng jquery, nhúng 1 html vào 1 id ?? bằng jquery qua đối tương json
//$ : truy cập jquery

// let trips = [];
//forEach-- gọi tới 1 hàm trong phần tử của mảng


let wrapper_route = $('#wrapper-route');//khai báo biến wrapper-route và gọi đến ohaanf tử có id=wrapper-route
routes.forEach((item, index) => {//vòng for chạy từ đối tượng[chỉ số 0]-đối tượng[chỉ số index(cuối cùng)] của mảng route
// append chèn nội dung vào cuối phần tử đc chọn
    wrapper_route.append(`
    <div class="col-lg-12" id="${item._id}">
        <div>
            <a data-toggle="collapse" href="#collapse${item._id}">  <!--lớp collapse dùng để ẩn /hiện khối div có id=collapseOne,lớp collapse show để ban ddaauf hiện khối div,dâta-parent -->
                <h5>Cung đường : <span id="item2">${item.name}</span></h5>
            </a>
        </div>
        <div id="collapse${item._id}" class="collapse">
            <div class="item4 row wrapper-trips">         
            </div>
        <div>
    </div>`);

});


$.getJSON("../trip.json", function(result){
    let id_trips = []
    let trips=result
    // console.log(trips)
    for(let i=0; i<=3;i++){
        // console.log(routes[i]._id);
        
        let tripID = trips.filter((trip)=>
        {
            return trip.routeID==routes[i]._id;
        })
        // console.log(tripID);
        
       tripID.forEach((item,index)=>{
           console.log($(`#${routes[i]._id}`).find('.wrapper-trips'));
           let date= new Date(item.startTime);
           $(`#${routes[i]._id}`).find('.wrapper-trips').append(`
           <div class="col-lg-3">
           <div class="x3">
            <div class="row">
                <div class="col-lg-4 item3"><span class="item0"> Phơi dcar </span></div>
                <div class="col-lg-4">${date.getHours()+ " : "+ date.getMinutes()} </div>
                <div class="col-lg-4">Tìm kiếm</div>
            </div>
            <div class ="row">
                <div class="col-lg-8">${item.driver.user.name}</div>
                <div class="col-lg-4"><span class="item1">${item.car.numberPlate}</span></div>
            </div>
            <div class="row">
                <div class="col-lg-12 item3"><span class="iteam2 iteam4"></span></div>
            </div>
        </div>
        </div>
         `)
       })
    }


});
//   console.log(trips)
