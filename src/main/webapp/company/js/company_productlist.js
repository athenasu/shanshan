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

    /* -----------商品dataTable開始---------- */
     $.ajax({
    	 	url:`/shanshan/companyProduct/findByComId`,
    	 	type:"GET",
    	 	dataType:"json",
    	 	success: function(data){
    	 		console.log("search success");
    	 		datalist(data);
    	 	},
     		error: function(){
     	          console.log("search error")
            }
     });
     
     function datalist(data){
    	 var allproducts = $('#productlist').dataTable({
    		 "lengthMenu":[5,10,20],
    	      // 中文化
    	     "language":{
    	        "url":"https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json",
    	      },
    		 "aaData":data,
    		 "columns":[
               {'data':'prodesId'},
    	         {'data':'productName'},
    	         {'data':'productPrice'},
               {'data':'status',
                'render': function(data){
                  if(data == 0){
                    return data = '下架'
                  }else{
                    return data = '上架'
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
    	         {'data':'proDesStock'},
    	       ]
    	 })
     }
      
     /* -----------商品dataTable結束---------- */
      
      })

    
   
