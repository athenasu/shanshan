const login_memberId = window.localStorage.getItem("LoginID");
const login_memberName = window.localStorage.getItem("LoginNAME");
// function init() {
$(document).ready(function () {

    // $.ajax({
    //     url: "../event/popularEvents",
    //     type: "GET",
    //     data: {},
    //     dataType: "json",
    //     beforeSend: function () {

    //     },
    //     success: function (data) {
    //         // console.log(data);
    //         // console.log(data[0].eventName);
    //         // console.log(new Date(data[0].eventStartDate));
    //         let popular_events = "";

    //         $.each(data, function (index, item) {
    //             var bytes = new Uint8Array(item.mountainPic);
    //             var blob = new Blob([bytes], { type: "image/png" });
    //             var url = URL.createObjectURL(blob);
    //             // console.log(JSON.stringify(item.mountainPic));
    //             // popular_events += "<div class='slideshow-container'>";
    //             popular_events += "<div class='mySlides fade'>";
    //             popular_events += "<img class='event_slide_pic' src='" + url + "'>";
    //             popular_events += "<input type='hidden' class='event_id' value='" + item.eventId + "'>"
    //             popular_events += "<div class='text'>" + item.eventName + "</div>";
    //             popular_events += "<h4 class ='text'>出團日期：" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</h4>"
    //             popular_events += "</div>"
    //             // popular_events += "</div>"
    //         })
    //         $("div.slideshow-container").append(popular_events);
    //     }
    // })

    $.ajax({
        url: "../event/eventList",
        type: "GET",
        data: {},
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            let event_list = "";
            $.each(data, function (index, item) {
                // console.log(item)

                var bytes = new Uint8Array(item.mountainPic);
                var blob = new Blob([bytes], { type: "image/png" });
                var url = URL.createObjectURL(blob);
                // console.log(url);

                event_list += "<div class='event_display'>";
                event_list += "<img class ='event_pic' src='" + url + "'>";
                event_list += "<input type='hidden' class='event_id' value='" + item.eventId + "'>"
                event_list += "<h3 class='event_name'>" + item.eventName + "</h3>";
                event_list += "<div class='event_start_date'>出團日期：<span>" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</span></div>"
                event_list += "</div>"

            })
            $("div.main_block").html(event_list);
        }
    })


    // wwwwwwwwwww輪播圖 圖片輸出 開始wwwwwwwwwww

    $.ajax({
        url: "../event/popularEvents",
        type: "GET",
        data: {},
        dataType: "json",
        beforeSend: function () {
        },
        success: function (data) {

            $.each(data, function (index, item) {
                var bytes = new Uint8Array(item.mountainPic);
                var blob = new Blob([bytes], { type: "image/png" });
                var url = URL.createObjectURL(blob);

                console.log(url)
                $("div.goodsindex_topslideshow").find(".slidepic").eq(index).attr("src", url);
                $("div.goodsindex_topslideshow").find("input.event_id").eq(index).val(`${item.eventId}`);
                $("div.goodsindex_topslideshow").find("div.event_name_text").eq(index).text("出團地點：" + `${item.eventName}`);

                let event_date = "出團日期：" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }))
                $("div.goodsindex_topslideshow").find("div.event_date_text").eq(index).val(event_date);

                //             popular_events += "<h4 class ='text'>出團日期：" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</h4>"
            })

        }
    })
    // wwwwwwwwwww輪播圖 圖片輸出 結束 wwwwwwwwwww

})
//var slideIndex = 0;
//showSlides();
//
//function showSlides() {
//  var i;
//  var slides = $("div.mySlides");
//  var dots = $("span.dot");
//  for (i = 0; i < slides.length; i++) {
//    slides[i].style.display = "none";  
//  }
//  slideIndex++;
//  if (slideIndex > slides.length) {slideIndex = 1}    
//  for (i = 0; i < dots.length; i++) {
//    dots[i].className = dots[i].className.replace(" active", "");
//  }
//  slides[slideIndex-1].style.display = "block";  
//  dots[slideIndex-1].className += " active";
//  setTimeout(showSlides, 2000); // Change image every 2 seconds
//}
//============================== SELECT BY DISTRICT ============================
$(document).on("click", "div.north_area", function () {
    console.log($(this))
    $("div.event_display").remove();
    $.ajax({
        url: "../event/findEventByDistrict",
        type: "GET",
        // contentType: 'application/json',
        data: { "mountainDistrict": 1 },
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            // console.log(data);
            let event_list = "";
            $.each(data, function (index, item) {
                console.log(item)

                // var bytes = new Uint8Array(item.mountainPic);
                // var blob = new Blob([bytes], { type: "image/png" });
                // var url = URL.createObjectURL(blob);
                // console.log(url);

                const bytesStr = atob(item.mountainPic);
                let len = bytesStr.length;
                const u8Array = new Uint8Array(len);
                while (len--) {
                    u8Array[len] = bytesStr.charCodeAt(len);
                }
                const blob = new Blob([u8Array]);
                const url = URL.createObjectURL(blob);

                event_list += "<div class='event_display'>";
                event_list += "<img class ='event_pic' src='" + url + "'>";
                event_list += "<input type='hidden' class='event_id' value='" + item.eventId + "'>"
                event_list += "<h3 class='event_name'>" + item.eventName + "</h3>";
                event_list += "<div class='event_start_date'>出團日期：<span>" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</span></div>"
                event_list += "</div>"
            })
            $("div.main_block").html(event_list);
        }
    })
})
$(document).on("click", "div.mid_area", function () {
    $("div.event_display").remove();
    $.ajax({
        url: "../event/findEventByDistrict",
        type: "GET",
        // contentType: 'application/json',
        data: { "mountainDistrict": 2 },
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            // console.log(data);
            let event_list = "";
            $.each(data, function (index, item) {
                console.log(item)
                const bytesStr = atob(item.mountainPic);
                let len = bytesStr.length;
                const u8Array = new Uint8Array(len);
                while (len--) {
                    u8Array[len] = bytesStr.charCodeAt(len);
                }
                const blob = new Blob([u8Array]);
                const url = URL.createObjectURL(blob);

                // var bytes = new Uint8Array(item.mountainPic);
                // var blob = new Blob([bytes], { type: "image/png" });
                // var url = URL.createObjectURL(blob);
                // console.log(url);

                event_list += "<div class='event_display'>";
                event_list += "<img class ='event_pic' src='" + url + "'>";
                event_list += "<input type='hidden' class='event_id' value='" + item.eventId + "'>"
                event_list += "<h3 class='event_name'>" + item.eventName + "</h3>";
                event_list += "<div class='event_start_date'>出團日期：<span>" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</span></div>"
                event_list += "</div>"
            })
            $("div.main_block").html(event_list);
        }
    })
})
$(document).on("click", "div.south_area", function () {
    $("div.event_display").remove();
    $.ajax({
        url: "../event/findEventByDistrict",
        type: "GET",
        // contentType: 'application/json',
        data: { "mountainDistrict": 3 },
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            // console.log(data);
            let event_list = "";
            $.each(data, function (index, item) {
                console.log(item)

                // var bytes = new Uint8Array(item.mountainPic);
                // var blob = new Blob([bytes], { type: "image/png" });
                // var url = URL.createObjectURL(blob);
                // console.log(url);

                const bytesStr = atob(item.mountainPic);
                let len = bytesStr.length;
                const u8Array = new Uint8Array(len);
                while (len--) {
                    u8Array[len] = bytesStr.charCodeAt(len);
                }
                const blob = new Blob([u8Array]);
                const url = URL.createObjectURL(blob);

                event_list += "<div class='event_display'>";
                event_list += "<img class ='event_pic' src='" + url + "'>";
                event_list += "<input type='hidden' class='event_id' value='" + item.eventId + "'>"
                event_list += "<h3 class='event_name'>" + item.eventName + "</h3>";
                event_list += "<div class='event_start_date'>出團日期：<span>" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</span></div>"
                event_list += "</div>"
            })
            $("div.main_block").html(event_list);
        }
    })
})
$(document).on("click", "div.east_area", function () {
    $("div.event_display").remove();
    $.ajax({
        url: "../event/findEventByDistrict",
        type: "GET",
        // contentType: 'application/json',
        data: { "mountainDistrict": 4 },
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            // console.log(data);
            let event_list = "";
            $.each(data, function (index, item) {
                console.log(item)

                // var bytes = new Uint8Array(item.mountainPic);
                // var blob = new Blob([bytes], { type: "image/png" });
                // var url = URL.createObjectURL(blob);
                // console.log(url);

                const bytesStr = atob(item.mountainPic);
                let len = bytesStr.length;
                const u8Array = new Uint8Array(len);
                while (len--) {
                    u8Array[len] = bytesStr.charCodeAt(len);
                }
                const blob = new Blob([u8Array]);
                const url = URL.createObjectURL(blob);

                event_list += "<div class='event_display'>";
                event_list += "<img class ='event_pic' src='" + url + "'>";
                event_list += "<input type='hidden' class='event_id' value='" + item.eventId + "'>"
                event_list += "<h3 class='event_name'>" + item.eventName + "</h3>";
                event_list += "<div class='event_start_date'>出團日期：<span>" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</span></div>"
                event_list += "</div>"
            })
            $("div.main_block").html(event_list);
        }
    })
})
$(document).on("click", "div.other_area", function () {
    $("div.event_display").remove();
    $.ajax({
        url: "../event/findEventByDistrict",
        type: "GET",
        // contentType: 'application/json',
        data: { "mountainDistrict": 5 },
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            // console.log(data);
            let event_list = "";
            $.each(data, function (index, item) {
                console.log(item)

                // var bytes = new Uint8Array(item.mountainPic);
                // var blob = new Blob([bytes], { type: "image/png" });
                // var url = URL.createObjectURL(blob);
                // console.log(url);

                const bytesStr = atob(item.mountainPic);
                let len = bytesStr.length;
                const u8Array = new Uint8Array(len);
                while (len--) {
                    u8Array[len] = bytesStr.charCodeAt(len);
                }
                const blob = new Blob([u8Array]);
                const url = URL.createObjectURL(blob);

                event_list += "<div class='event_display'>";
                event_list += "<img class ='event_pic' src='" + url + "'>";
                event_list += "<input type='hidden' class='event_id' value='" + item.eventId + "'>"
                event_list += "<h3 class='event_name'>" + item.eventName + "</h3>";
                event_list += "<div class='event_start_date'>出團日期：<span>" + (new Date(item.eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })) + "</span></div>"
                event_list += "</div>"
            })
            $("div.main_block").html(event_list);
        }
    })
})

//============================== REDIRECT TO EVENT VIEW PAGE ============================
$(document).on("click", "div.event_display", function () {
    // console.log($(this).find("input").val());
	console.log("123")
    window.localStorage.setItem("eventID", $(this).find("input").val());
    // window.sessionStorage.setItem("eventID", $(this).find("input").val())
    window.location.href = "eventview.html";
})

//============================== REDIRECT TO EVENTPOST PAGE ============================
$(document).on("click", "button.create_event", function () {
    console.log(login_memberId)
    console.log("123")
    if (login_memberId != "null") {
        window.location.href = "eventpost.html";
    } else {
        $("div.login_modal_bcg").removeClass("-none");
        $("div.login_modal").removeClass("-none");
    }
})


//=======================================================================================
