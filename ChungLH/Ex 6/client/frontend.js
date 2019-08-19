var isUpdating = false;
$(document).ready(function () {
  //Add product // Create
  $("#add").click(function () {
    //event.preventDefault();
    var formData = new FormData();
    formData.append("name", $("#name").val());
    formData.append("age", $("#age").val());
    formData.append("category", $("#category").val());
    formData.append("description", $("#description").val());
    formData.append("cost", $("#cost").val());
    // console.log(formData);
    // console.log(document.getElementById('uploadImage').files[0]);
    
    formData.append("productImage", $('#uploadImage').get(0).files[0]);
    //console.log(formData);
    $.ajax({
      url: "/pet/product",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: (data) => {
        if (data == "Successed") {
          //alert("Da luu database, viet ham update len client di ban");
          window.location.reload();
        }
        else {
          alert(data);
        }
      }
    });
    return false;
    alert(2222222222222);

  })

  //Show products //Read 
  $.ajax({
    url: "/pet/load",
    type: "GET",
    dataType: 'json',
    success: (data) => {
      console.log(data);
      let pet = data;
      pet.forEach((element, index) => {
        prependToCategory(element.name, element.age, element.category, element.description, element.cost, element._id, element.productImage)
      });
    }
  })

  //Update
  $(() => {
    setTimeout(updateMerchandise, 1000);
  })

  //Delete
  $(function () {
    setTimeout(deleteMerchandise, 1000);
  });
})

var prependToCategory = (name, age, category, description, cost, id, image) => {
  //console.log(name);

  let content = `<div class="col-lg-4 col-md-6 mb-4 merchandise" id="${id}">
  <div class="card h-100">
    <img class="card-img-top" id="image" src="../${image}" data-toggle="modal" data-target="#id${id}">
    <!-- Modal -->
    <div class="modal fade" id="id${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">${name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="../${image}" alt="" class="img-fluid modelImg">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
    <div class="card-body">
      <h4 class="card-title text-center text-primary " id="name"><span class="content">${name}</span>
      </h4>
      <h5 class="text-center text-danger " id="cost"><span class="content">${cost}</span>$</h5>
      <hr>
      <h6 class="" id="age"><span class="content">${age}</span> year(s) old</h6></h6>
      <p class="card-text " id="description"><span class="content">${description} </span>
      </p>
    </div>
    <div class="card-body">
    <div class="pushDown row">
      <button class="btn btn-danger">Delete</button>
      <button class="btn btn-success">Save</button>
      <button class="btn btn-warning">Modify</button>
      
    </div>
</div>
    </div>
  </div>
</div>`;
  $(`.${category}`).prepend(content);
}

var startUpdate = () => {
  $('.merchandise').on('click', '.btn-warning', function () {
    if (isUpdating == true) {
      alert("Please complete the previous updating");
    }
    else {
      isUpdating = true;
      console.log($(this), 3333);
      console.log($(this).closest('.merchandise').attr("id"));
      let id = $(this).closest('.merchandise').attr("id");

      $(`#${id} .updateImg`).css("display", "block");
      $(`#${id} .btn-warning`).css("display", "none");
      $(`#${id} .btn-success`).css("display", "block");

      //show textarea
      $(`#${id} .content`).each(function () {
        var content = $(this).text();
        $(this).html(`<input class="float-left" type="text" value="${content}">`);
      });
    }
  })
}

var updateWhileClickOnUpdate = () => {
  $('.merchandise').on('click', '.btn-success', function () {
    // console.log($(this), 444444);
    // console.log($(this).closest('.merchandise').attr("id"));
    //console.log($("#name input").val());
    let id = $(this).closest('.merchandise').attr("id");
    $.ajax({
      url: `pet/update/${id}`,
      type: "PUT",
      data: {
        id: id,
        name: $("#name input").val(),
        cost: $("#cost input").val(),
        age: $("#age input").val(),
        description: $("#description input").val()
      },
      success: (data) => {
        console.log("updated");
        console.log(data);
        //alert("Updated")
        $(`#${id} .btn-warning`).css('display', 'block');
        $(`#${id} .content input`).each(function () {
          var content = $(this).val();
          console.log(content, 192);
          $(this).html(content);
          $(this).contents().unwrap();
          $(`#${id} .updateImg`).css("display", "none");
        });
        isUpdating = false;
      }
    })
  })
}

var updateMerchandise = () => {
  startUpdate();
  updateWhileClickOnUpdate();
}

var deleteMerchandise = () => {
  $('.merchandise').on('click', '.btn-danger', function () {
    console.log($(this));
    alert("You are going to delete a pet from your stand");
    //alert($(this).closest('.merchandise').attr("id"));
    const id = $(this).closest('.merchandise').attr("id");
    $.ajax({
      url: '/pet/delete/' + id,
      method: 'DELETE',
      data: { id: id }
    }).done(function (res) {
      console.log("successed delete");
      if (res.success) {
        console.log('id from ajax call is', res);
        location.reload();
      } else {
        console.log('error...ajax');
      }
    });
  });
}