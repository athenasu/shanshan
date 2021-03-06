$(function(){
    /* ----------側邊欄開始---------- */
    $('ul.subs').hide()
    $('div.main').click(function(){
      $('ul.subs').slideUp()
      $('div.main').removeClass('open')
      if($('+ul',this).css('display')=='none'){
        $('+ul',this).slideDown()
        $(this).addClass('open')
      }
    })
    .mouseover(function(){
      $(this).addClass('rollover')
    })
    .mouseout(function(){
      $(this).removeClass('rollover')
    })
    /* -----------側邊欄結束---------- */

    /* -----------登出鈕開始---------- */
    $('button.logout').click(function(e){
      $('div.logoutConfirmbox').dialog("open");
       e.preventDefault();
    });
    $('div.logoutConfirmbox').dialog({
      autoOpen:false,
      modal:true,
      title:"確認登出",
      buttons:{
        "是":function(){
          $(this).dialog("close");
          fetch(`/shanshan/company/logout`)
          .then((response) =>
          console.log(response)
          );
          window.location.replace("../index/index.jsp")
        },
        "否":function(){
          $(this).dialog("close");
        }
      }

    });
    /* -----------登出鈕結束---------- */

    //dateformat method 
    const dateformat = function (data){
      var date = new Date (data);
      var month = date.getMonth() +1;
      var dateStr = date.getFullYear()+ "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate()  ;
      return dateStr;
    }
    /* -----------商品dataTable開始---------- */
    $.ajax({
        url:`/shanshan/companyProduct/findByComId`,
        type:"GET",
        dataType:"json",
        success: function(data){
          console.log("success")
          console.log(data);
          alreadylist(data);
        },
        error: function(){
          console.log("search error");
        }
    })
    function alreadylist(data){
      var already = $('#allProduct').DataTable({
        "lengthMenu":[5,10,20],
        "language":{
          "url":"https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
        },
        "aaData":data,
        "columns":[
          {'data':'prodesId'},
          {'data':'productName'},
          {'data':'productType',
            'render': function(data){
              if(data == 1){
                return data = '衣著'
              }else if(data ==2){
                return data = '工具照明'
              }else if(data == 3){
                return data = '炊具'
              }else{
                return data = '帳篷寢具'
              }
            }
          },
          {'data':'productPrice'},
          {'data':'productSize',
            'render': function(data){
              if(data == 0){
                return data = 'F'
              }else if(data == 1){
                return data = 'S'
              }else if(data == 2){
                return data = 'M'
              }else if(data == 3){
                return data = 'L'
              }else{
                return data = 'XL'
              }
            }
          },
          {'data':'productColor'},
          {'data':'proDesStock'},
          {'data':'status',
            'render': function(data){
              if(data == 0){
                return data = '下架'
              }else{
                return data = '上架'
              }
              }
          },
          {'data':null,
            'render':function(data,type,row){
              return '<button type="button" class="update">修改</button>'
            }
          },
          {'data':null,
            'render':function(data,type,row){
            return '<button type="button" class="onShelf">上架</button>'
            }
          },
          {'data':null,
            'render':function(data,type,row){
            return '<button type="button" class="downShelf">下架</button>'
            }
          }
        ]
      })
    }
    /* ----------------------------------商品dataTable結束----------------------------------- */
    /////////////////////////////////////單一商品圖修改開始///////////////////////////////////
  
        /* -------------------------- 商品圖上傳 ------------------------ */
        let pro = document.getElementById("pro");
        pro.addEventListener("change",function(e){
          // console.log("change")
        var proimg = document.getElementsByClassName("proimg")[0];
        proimg.innerHTML = "";
  
          let reader = new FileReader();
          reader.readAsDataURL(this.files[0]);
          reader.addEventListener("load",function(){
            console.log(reader.result);
            let li_html =`<li><img src="${reader.result}" class="probanner"></li>`;
            proimg.insertAdjacentHTML("beforeend",li_html);
          });
        })

    /////////////////////////////////////單一商品修改開始///////////////////////////////////
    /////////////////////////////////////單一商品頁面顯示///////////////////////////////////
    let ulProimg = document.querySelector(".proimg");
    $('div.proinfo').dialog({
      width:900,
      autoOpen:false,
    });
    $('.productlist tbody').on('click','.update',function(e){
      console.log("in click order update function")
      e.preventDefault();
      ulProimg.innerHTML = "";
      var proImgLength = "";
      $("#pImgs").change(function(){
        proImgLength = this.files.length;
      })
      let productDesId = $(this).parents("tr").find("td").eq(0).text();
      console.log(productDesId);
      $('div.proinfo').dialog({
        open: function(){
          $.ajax({
               url:`/shanshan/companyProduct/findByProDesIdAllStatus?prodesId=${productDesId}`,
            type:"GET",
            dataType:"json",
            success: function(data){
              console.log(data);
              console.log("product update des")
              
              $.each(data,function(index,item){
                document.querySelector(".proIdHidden").value = item.productId;
                document.querySelector(".proDesIdHidden").value = item.prodesId;
                document.querySelector(".proname").value = item.productName;
                document.querySelector(".proprice").value = item.productPrice;
                // console.log(item.productSize);
                var sizeValue = item.productSize;
                if(sizeValue == 0){
                  $("input[name=product][value=0]").attr("checked",true);
                }else if(sizeValue == 1){
                  $("input[name=product][value=1]").attr("checked",true);
                }else if(sizeValue == 2){
                  $("input[name=product][value=2]").attr("checked",true);
                }else if(sizeValue == 3){
                  $("input[name=product][value=3]").attr("checked",true);
                }else{
                  $("input[name=product][value=4]").attr("checked",true);
                }
                var typeValue = item.productType;
                if(typeValue == 1){
                  $("input[name=pType][value=1]").attr("checked",true);
                }else if(typeValue == 2){
                  $("input[name=pType][value=2]").attr("checked",true);
                }else if(typeValue == 3){
                  $("input[name=pType][value=3]").attr("checked",true);
                }else if(typeValue == 4){
                  $("input[name=pType][value=4]").attr("checked",true);
                }
                document.querySelector(".color").value = item.productColor;
                document.querySelector(".stock").value = item.proDesStock;
                document.querySelector(".prointro").value = item.productIntro;              
              })
              /////////////get product img /////////////////
              $.ajax({
                url:`/shanshan/companyProduct/findByproDes?productDesId=${productDesId}`,
                type:"GET",
                dataType:"json",
                success: function(data){
                  console.log("in pro img");
                  console.log(data);
                 
                  let imgNum = 0;
                  $.each(data,function(index,item){
                    /////// 抓Id ///////////
                    // document.querySelector(".imgid").value = item.productImgId;
                    //////////讀圖//////////
                    imgNum += 1;
                    const binStr = atob(item.productImg);
                    let len = binStr.length;
                    const u8Array = new Uint8Array(len);
                    while(len--){
                      u8Array[len] = binStr.charCodeAt(len);
                    }
                    const blob = new Blob([u8Array]);
                    const url = URL.createObjectURL(blob);
                    
                    let html = `<img class="smallimg proimg${imgNum}" src="${url}" alt="proimg${imgNum}"/>`;
                    ulProimg.insertAdjacentHTML("afterbegin", html);
                  })
                }
              })
            },
            error: function(){
              console.log("product update des error")
            }
          });
        },
        modal:true,
        title:"商品資料更動",
        buttons:{
          "更新資訊": function(){
            // step1 帶入companyId/productId
            let productId = document.querySelector(".proIdHidden").value;
            let productName = document.querySelector(".proname").value;
            let productPrice = document.querySelector(".proprice").value;
            let productType = $("input[name=pType]:checked").val();
            let productIntro = document.querySelector(".prointro").value;
              fetch(`/shanshan/companyProduct/updateproduct` , {
                method:"POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  // productImg:base64str,
                  productId,
                  productName,
                  productPrice,
                  // productSize,
                  productType,
                  // productColor,
                  // productStock,
                  productIntro,
                })
              })
              .then(function(response){
                console.log(response);
                return response.json();
              })
              .then((body) => {
                console.log(body.productId);
                let productId = body.productId;
                console.log(productId)
                // step2 帶入step1建立好的productId 將prodes物件建起("尺寸顏色庫存" 價格不可為空值)
                let productDesId = document.querySelector(".proDesIdHidden").value;
                let productSize = $("input[name=product]:checked").val();
                let productColor = document.querySelector(".color").value;
                let productStock = document.querySelector(".stock").value;
                let productPrice = document.querySelector(".proprice").value;
                fetch(`/shanshan/companyProduct/updateProDes` , {
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                    productId,
                    productDesId,
                    productSize,
                    productColor,
                    productStock,
                    productPrice,
                  })
                })
                .then(function(response){
                  console.log("in prodes response");
                  console.log(response);
                  return response.json();
                })
                .then((body) => {
                  console.log(body.productDesId);
                  let productDesId = body.productDesId;
                  console.log(productDesId)

                  // step3 帶入prodesId 建入img(帶入desId圖檔)
                  // let productImgId = document.querySelector("imgid").value;
                  let productImg = document.querySelector(".upload_pro");
                  const file1 = productImg.files[0];
                  const fileReader = new FileReader(); 

                  fileReader.onload = function(e){
                    const base64str = btoa(e.target.result);
                    fetch(`/shanshan/companyProduct/updateProImg` , {
                      method:"POST",
                      headers:{
                        "Content-Type":"application/json"
                      },
                      body: JSON.stringify({
                        productDesId,
                        productImg:base64str,
                      }),
                    }).then(body => body.json())
                      .then(product => {
                      console.log(product);
                      alert("資料已更新");
                      $(this).dialog("close");
                    })
                  };
                  fileReader.readAsBinaryString(file1);
                })
                
              })
              
            }
          },
          "清空重填": function(){
            proimg.innerHTML = '<span class="sbtext">圖片預覽</span>';
          },
          "取消更新": function(){
            $(this).dialog("close");
          }
        })
      //open寫在整個dialog外,dialog open之後進行資料傳輸載入 
      $('div.proinfo').dialog("open");
      });
      
    
    /* -----------單一商品上下架開始---------- */
    $('div.onShelfConfirm').dialog({
      width:850,
      autoOpen:false,
    });
    $('div.downShelfConfirm').dialog({
      width:850,
      autoOpen:false,
    });
    $('.productlist tbody').on('click','.onShelf',function(e){
      console.log("in click order onShelf function")
      e.preventDefault();
      //設定動態productDesId
      let productDesId = $(this).parents("tr").find("td").eq(0).text();
      console.log(productDesId);
      
      
      
      $('div.onShelfConfirm').dialog({
        open: function(){
          $.ajax({
            url:`/shanshan/product/findByIdAllStatus?prodesId=${productDesId}`,
            type:"GET",
            dataType:"json",
            success: function(data){
              console.log("des success");
              console.log(data);
              //step1 初始化dataTable
              dttable = $('#prodes').dataTable();
              //step2 清空dataTable
              dttable.fnClearTable();
              //step3 還原已經初始化過的dataTable
              dttable.fnDestroy();
              dttable = $('#prodes').dataTable({
                //retrieve 設定為true避免dataTable不停警告重複初始化
                "retrieve":true,
                "searching": false,
                "ordering":false,
                "autoWidth":true,
                "paging":false,
                "info":false,
                "lengthMenu":[5,10,20],
                "language":{
                  "url":"https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
                },
                "aaData":data,
                "columns":[
                  {'data':'prodesId'},
                  {'data':'productName'},
                  {'data':'productType',
                    'render': function(data){
                      if(data == 1){
                        return data = '衣著'
                      }else if(data ==2){
                        return data = '工具照明'
                      }else if(data == 3){
                        return data = '炊具'
                      }else{
                        return data = '帳篷寢具'
                      }
                    }
                  },
                  {'data':'productSize',
                    'render': function(data){
                      if(data == 0){
                        return data = 'F'
                      }else if(data ==1){
                        return data = 'S'
                      }else if(data == 2){
                        return data = 'M'
                      }else if(data == 3){
                        return data = 'L'
                      }else{
                        return data = 'XL'
                      }
                    }
                  },
                  {'data':'productColor'},
                  {'data':'productPrice'},
                ]
              })
              document.getElementById("prodes").style.width='100%';
            },
            error: function(){
              console.log("search error");
            }
          });
        },
        modal:true,
        title:"確認商品上架",
        buttons:{
          "確認上架":function(){
            //update productDes Status > 1
            let status = 1;
            // let productDesId = document.querySelector(".conProDesId").value;
            fetch(`/shanshan/companyProduct/updateProDesStatusOfShelf` , {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({
                status,
                productDesId,
              })
            })
            $(this).dialog("close");
            alert('此商品已上架');
          },
          "取消上架":function(){
            $(this).dialog("close");
          }
        }
      });
      //open寫在整個dialog外,dialog open之後進行資料傳輸載入 
      $('div.onShelfConfirm').dialog("open");
    });

/* -----------單一商品下架開始---------- */
    $('.productlist tbody').on('click','.downShelf',function(e){
      console.log("in click order downShelf function")
      e.preventDefault();
      let productDesId = $(this).parents("tr").find("td").eq(0).text();
      console.log(productDesId);
      $('div.downShelfConfirm').dialog({
        open: function(){
          $.ajax({
            url:`/shanshan/product/findByIdAllStatus?prodesId=${productDesId}`,
            type:"GET",
            dataType:"json",
            success: function(data){
              console.log("des success");
              // console.log(data);
              //step1 初始化dataTable
              dttable = $('#prodesDown').dataTable();
              //step2 清空dataTable
              dttable.fnClearTable();
              //step3 還原已經初始化過的dataTable
              dttable.fnDestroy();
              dttable = $('#prodesDown').dataTable({
                //retrieve 設定為true避免dataTable不停警告重複初始化
                "retrieve":true,
                "searching": false,
                "ordering":false,
                "autoWidth":true,
                "paging":false,
                "info":false,
                "lengthMenu":[5,10,20],
                "language":{
                  "url":"https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
                },
                "aaData":data,
                "columns":[
                  {'data':'prodesId'},
                  {'data':'productName'},
                  {'data':'productType',
                    'render': function(data){
                      if(data == 1){
                        return data = '衣著'
                      }else if(data ==2){
                        return data = '工具照明'
                      }else if(data == 3){
                        return data = '炊具'
                      }else{
                        return data = '帳篷寢具'
                      }
                    }
                  },
                  {'data':'productSize',
                    'render': function(data){
                      if(data == 0){
                        return data = 'F'
                      }else if(data ==1){
                        return data = 'S'
                      }else if(data == 2){
                        return data = 'M'
                      }else if(data == 3){
                        return data = 'L'
                      }else{
                        return data = 'XL'
                      }
                    }
                  },
                  {'data':'productColor'},
                  {'data':'productPrice'},
                ]
              })
              document.getElementById("prodes").style.width='100%';
            },
            error: function(){
              console.log("search error");
            }
          });
        },
        modal:true,
        title:"確認商品下架",
        buttons:{
          "確認下架":function(){
            //update productDes Status > 0
            let status = 0;
            console.log(productDesId);
            fetch(`/shanshan/companyProduct/updateProDesStatusOfShelf` , {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({
                status,
                productDesId,
              })
            })
            $(this).dialog("close");
            alert('此商品已下架');
          },
          "取消下架":function(){
            $(this).dialog("close");
          }
        }
      })
      //open寫在整個dialog外,dialog open之後進行資料傳輸載入 
      $('div.downShelfConfirm').dialog("open");
    })

    
})  
