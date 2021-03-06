// var login_memberId = 1;
const login_memberId = window.localStorage.getItem("LoginID");
const login_memberName = window.localStorage.getItem("LoginNAME");
$(document).on("click", function () {
    $(".lightbox-target").removeClass("-on")
    $(".lightbox-target2").removeClass("-on")
    $(".lightbox-target3").removeClass("-on")
})

$(document).on("click", "div.lightbox-target", function (e) {
    e.stopPropagation()
})
$(document).on("click", "div.lightbox-target2", function (e) {
    e.stopPropagation()
})
$(document).on("click", "div.lightbox-target3", function (e) {
    e.stopPropagation()
})

$(document).on("click", "#event_report_reason", function () {
    $("div.event_report_content").attr("data-reporttype", $(this).val())
})

$(document).on("click", "#msg_report_reason", function () {
    $("div.msg_report_content").attr("data-reporttype", $(this).val())
})

$(document).on("click", "button.cancel_msg_report", function () {
    $(".lightbox-target3").removeClass("-on")
})

$(document).on("change", "#event_deadline", function () {
    $("#event_deadline").attr("value", $(this).val());
})
$(document).on("change", "#event_start_date", function () {
    $("#event_start_date").attr("value", $(this).val());
})
$(document).on("change", "#difficulty", function () {
    $("#difficulty").attr("value", $(this).val());
})
$(document).on("change", "#stay_type", function () {
    $("#stay_type").attr("value", $(this).val());
})
$(document).on("change", "#mountain_id", function () {
    $("#mountain_id").attr("value", $(this).val());
})
$(document).on("click", "button.cancel_participate", function () {
    $(".lightbox-target").removeClass("-on")
})
$(document).on("change", "select.experience", function () {
    $("select.experience").attr("value", $(this).val());
})
$(document).on("change", "select.participation", function () {
    $("select.participation").attr("value", $(this).val());
    console.log(this)
})
$(document).on("click", "button.cancel_event_report_btn", function () {
    $(".lightbox-target2").removeClass("-on")
})
$(document).on("change", "#mountain_area", function () {
    $("#mountain_area").attr("value", $(this).val());
    $("select").filter(".-on").removeClass("-on");

    var choice = parseInt($(this).val());
    switch (choice) {
        case 1:
            $("select.north_mountain").addClass("-on")
            break;
        case 2:
            $("select.mid_mountain").addClass("-on");
            break;
        case 3:
            $("select.south_mountain").addClass("-on");
            break;
        case 4:
            $("select.east_mountain").addClass("-on");
            break;
        case 5:
            $("select.other_mountain").addClass("-on");
            break;
    }
})

// function init() {
$(document).ready(function () {
    const eventID = window.localStorage.getItem("eventID");
    // console.log(login_memberId == "null")
    // console.log(login_memberId)
    // const eventID = window.sessionStorage.getItem("eventId");
    // console.log(eventId)
    //=========================== GET EVENT BY EVENT_ID FROM DATABASE ===========================
    $.ajax({
        url: "../event/findEventByEventId",
        type: "GET",
        data: { "eventId": eventID },
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            var bytes = new Uint8Array(data[0].mountainPic);
            var blob = new Blob([bytes], { type: "image/png" });
            var url = URL.createObjectURL(blob);

            let event_view_html = `
            <div class="event_name"><input class="event_name" value="${data[0].eventName}" readonly="readonly"></div>
            <div class="event_pic">
                <img class="event_pic" src="${url}">
            </div>
            <div class="wish_report">
                <div class="event_wish_heart -on"><i class="far fa-heart fa-2x"></i></div>
                <div class="event_wish_heart_filled"><i class="fas fa-heart fa-2x"></i></div>
                <button class="event_report_btn">Report</button>
                <button class="join_btn" href="lightbox-target">JOIN</button>
            </div>
            <div class="event_detail">
                <ul class="event_detail_left">
                    <li class="event_id" name="event_id" value="${data[0].eventId}"><span>???????????????${data[0].eventId}</span></li>
                    <li class="event_owner" data-ownerid="${data[0].memberId}" value="${data[0].memberName}"><span>??????????????????${data[0].memberName}</span></li>
                    <li class="mountain_district">???????????????
                        <select class="area_option" id="mountain_area" disabled>
                            <option class="north_mountain" name="mountain_district" value="1">??????</option>
                            <option class="mid_mountain" name="mountain_district" value="2">??????</option>
                            <option class="south_mountain" name="mountain_district" value="3">??????</option>
                            <option class="east_mountain" name="mountain_district" value="4">??????</option>
                            <option class="other_mountain" name="mountain_district" value="5">????????????</option>
                        </select>
                    </li>
                    <li class="mountain_name">?????????
                        <select class="north_mountain" id="mountain_id" disabled>
                            <option class="mountain_id" name="mountain_id" value="1">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="2">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="3">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="4">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="5">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="30">??????</option>
                        </select>
                        <select class="mid_mountain" id="mountain_id" disabled>
                            <option class="mountain_id" name="mountain_id" value="6">??????</option>
                            <option class="mountain_id" name="mountain_id" value="7">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="8">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="9">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="10">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="30">??????</option>
                        </select>
                        <select class="south_mountain" id="mountain_id" disabled>
                            <option class="mountain_id" name="mountain_id" value="11">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="12">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="13">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="14">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="15">??????</option>
                            <option class="mountain_id" name="mountain_id" value="30">??????</option>
                        </select>
                        <select class="east_mountain" id="mountain_id" disabled>
                            <option class="mountain_id" name="mountain_id" value="16">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="17">????????????</option>
                            <option class="mountain_id" name="mountain_id" value="18">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="19">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="20">???????????????</option>
                            <option class="mountain_id" name="mountain_id" value="30">??????</option>
                        </select>
                        <select class="other_mountain" id="mountain_id" disabled>
                            <option class="mountain_id" name="mountain_id" value="21">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="22">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="23">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="24">?????????</option>
                            <option class="mountain_id" name="mountain_id" value="30">??????</option>
                        </select>
                    </li>
                    <li class="assembling_place">???????????????<input class="assembling_place " type="text" value="${data[0].assemblingPlace}" readonly="readonly"></li>
                    <li class="difficulty">?????????
                        <select class="difficulty" id="difficulty" disabled>
                            <option class="easiest" name="difficulty" value="1">????????????</option>
                            <option class="easy" name="difficulty" value="2">??????</option>
                            <option class="normal" name="difficulty" value="3">??????</option>
                            <option class="difficult" name="difficulty" value="4">??????</option>
                            <option class="hardest" name="difficulty" value="5">????????????</option>
                        </select>
                    </li>
                    <li class="stay_type" >???????????????
                        <select class="stay_type" id="stay_type" value="${data[0].stayType}" disabled>
                            <option class="day_return" name="stay_type"  value="0">????????????</option>
                            <option class="camp" name="stay_type"  value="1">??????</option>
                            <option class="cabin" name="stay_type"  value="2">??????</option>
                            <option class="hotel" name="stay_type"  value="3">??????</option>
                        </select>
                    </li>
                </ul>
                <ul class="event_detail_right">
                    <li class="event_days">???????????????<input class="event_days " type="text" value="${data[0].eventDays}" readonly="readonly"></li>
                    <li class="event_deadline">???????????????<input class="event_deadline " type="date" value="${new Date(data[0].eventDeadline).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}" disabled></li>
                    <li class="event_start_date">?????????????????????<input class="event_start_date " type="date" value="${new Date(data[0].eventStartDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}" disabled></li>
                    <li class="max_num_of_people">???????????????<input class="min_num_of_people " value="${data[0].minNumOfPeople}"></li>
                    <li class="max_num_of_people">???????????????<input class="max_num_of_people " value="${data[0].maxNumOfPeople}"></li>
                    <li class="event_cur_part" value="${data[0].eventCurPart}">?????????????????????${data[0].eventCurPart}</li>
                    <li class="event_post_date">???????????????${new Date(data[0].eventPostDate).toLocaleString()}</li>
                </ul>
    
            </div>
            <div class="event_content">
                <textarea class="event_content" readonly>${data[0].eventContent}</textarea>
            </div>
            <div class="back_edit">
                <button class="back_btn">??????</button>
                <button class="edit_btn -none">??????</button>
                <button class="delete_btn -none">??????</button>
                <button class="send_btn -none">??????</button>
            </div>
            `

            $(".event_view").html(event_view_html);

            switch (parseInt(data[0].stayType)) {
                case 0:
                    $("option.day_return").prop('selected', true);
                    break;
                case 1:
                    $("option.camp").prop('selected', true);
                    break;
                case 2:
                    $("option.cabin").prop('selected', true);
                    break;
                case 3:
                    $("option.hotel").prop('selected', true);
                    break;
            }

            switch (parseInt(data[0].difficulty)) {
                case 1:
                    $("option.easiest").prop('selected', true);
                    break;
                case 2:
                    $("option.easy").prop('selected', true);
                    break;
                case 3:
                    $("option.normal").prop('selected', true);
                    break;
                case 4:
                    $("option.difficult").prop('selected', true);
                    break;
                case 5:
                    $("option.hardest").prop('selected', true);
                    break;
            }


            if (data[0].mountainId == 1 || data[0].mountainId == 2 || data[0].mountainId == 3 || data[0].mountainId == 4 || data[0].mountainId == 5) {
                $("option.north_mountain").prop('selected', true);
                $("select.north_mountain").addClass("-on")
                switch (parseInt(data[0].mountainId)) {
                    case 1:
                        console.log($("option.mountain_id").eq(0));
                        $("option.mountain_id").eq(0).prop('selected', true);
                        break;
                    case 2:
                        $("option.mountain_id").eq(1).prop('selected', true);
                        break;
                    case 3:
                        $("option.mountain_id").eq(2).prop('selected', true);
                        break;
                    case 4:
                        $("option.mountain_id").eq(3).prop('selected', true);
                        break;
                    case 5:
                        $("option.mountain_id").eq(4).prop('selected', true);
                        break;
                    case 100:
                        $("option.mountain_id").eq(5).prop('selected', true);
                        break;
                }
            } else if (data[0].mountainId == 6 || data[0].mountainId == 7 || data[0].mountainId == 8 || data[0].mountainId == 9 || data[0].mountainId == 10) {
                $("option.mid_mountain").prop('selected', true);
                $("select.mid_mountain").addClass("-on")
                switch (parseInt(data[0].mountainId)) {
                    case 6:
                        console.log($("option.mountain_id").eq(0));
                        $("option.mountain_id").eq(6).prop('selected', true);
                        break;
                    case 7:
                        $("option.mountain_id").eq(7).prop('selected', true);
                        break;
                    case 8:
                        $("option.mountain_id").eq(8).prop('selected', true);
                        break;
                    case 9:
                        $("option.mountain_id").eq(9).prop('selected', true);
                        break;
                    case 10:
                        $("option.mountain_id").eq(10).prop('selected', true);
                        break;
                    case 100:
                        $("option.mountain_id").eq(11).prop('selected', true);
                        break;
                }
            } else if (data[0].mountainId == 11 || data[0].mountainId == 12 || data[0].mountainId == 13 || data[0].mountainId == 14 || data[0].mountainId == 15) {
                $("option.south_mountain").prop('selected', true);
                $("select.south_mountain").addClass("-on")
                switch (parseInt(data[0].mountainId)) {
                    case 11:
                        console.log($("option.mountain_id").eq(0));
                        $("option.mountain_id").eq(12).prop('selected', true);
                        break;
                    case 12:
                        $("option.mountain_id").eq(13).prop('selected', true);
                        break;
                    case 13:
                        $("option.mountain_id").eq(14).prop('selected', true);
                        break;
                    case 14:
                        $("option.mountain_id").eq(15).prop('selected', true);
                        break;
                    case 15:
                        $("option.mountain_id").eq(16).prop('selected', true);
                        break;
                    case 100:
                        $("option.mountain_id").eq(17).prop('selected', true);
                        break;
                }
            } else if (data[0].mountainId == 16 || data[0].mountainId == 17 || data[0].mountainId == 18 || data[0].mountainId == 19 || data[0].mountainId == 20) {
                $("option.east_mountain").prop('selected', true);
                $("select.east_mountain").addClass("-on")
                switch (parseInt(data[0].mountainId)) {
                    case 16:
                        console.log($("option.mountain_id").eq(0));
                        $("option.mountain_id").eq(18).prop('selected', true);
                        break;
                    case 17:
                        $("option.mountain_id").eq(19).prop('selected', true);
                        break;
                    case 18:
                        $("option.mountain_id").eq(20).prop('selected', true);
                        break;
                    case 19:
                        $("option.mountain_id").eq(21).prop('selected', true);
                        break;
                    case 20:
                        $("option.mountain_id").eq(22).prop('selected', true);
                        break;
                    case 100:
                        $("option.mountain_id").eq(23).prop('selected', true);
                        break;
                }
            } else {
                $("option.other_mountain").prop('selected', true);
                $("select.other_mountain").addClass("-on")
                switch (parseInt(data[0].mountainId)) {
                    case 21:
                        console.log($("option.mountain_id").eq(0));
                        $("option.mountain_id").eq(24).prop('selected', true);
                        break;
                    case 22:
                        $("option.mountain_id").eq(25).prop('selected', true);
                        break;
                    case 23:
                        $("option.mountain_id").eq(26).prop('selected', true);
                        break;
                    case 24:
                        $("option.mountain_id").eq(27).prop('selected', true);
                        break;
                    case 25:
                        $("option.mountain_id").eq(28).prop('selected', true);
                        break;
                    case 100:
                        $("option.mountain_id").eq(29).prop('selected', true);
                        break;
                }
            }
            if (login_memberId == data[0].memberId) {
                $("button.edit_btn").removeClass("-none")
                $("button.event_report_btn").attr("disabled", true)
            }
            //=========================== GET EVENT REPORT BY MEMBER&EVENT FROM DATABASE ===========================
            if (login_memberId != "null") {
                $.ajax({
                    url: "../eventReport/selectEventReportByMemberId",
                    type: "GET",
                    data: {
                        "memberId": login_memberId,          //set as 1 for test, need to get the login memberId
                        "eventId": data[0].eventId
                    },
                    dataType: "json",
                    beforeSend: function () {

                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.length != 0) {
                            $("button.event_report_btn").attr("disabled", true)
                        }
                    }
                })
            }

            //=========================== GET EVENT WISHLIST BY MEMBER&EVENT FROM DATABASE ===========================
            $.ajax({
                url: "../wishlistEvent/findWishlistEventByMemberIdEventId",
                type: "GET",
                data: {
                    "memberId": login_memberId,              //set as 5 for test, need to get the login memberId
                    "eventId": $("li.event_id").val()
                },
                dataType: "json",
                beforeSend: function () {

                },
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        $("div.event_wish_heart").removeClass("-on");
                        $("div.event_wish_heart_filled").addClass("-on")
                    }
                }
            })
            //=========================== GET EVENT_MSG BY EVENT_ID FROM DATABASE ===========================
            $.ajax({
                url: "../eventMsg/eventMsgList",
                type: "GET",
                data: { "eventId": eventID },
                dataType: "json",
                beforeSend: function () {

                },
                success: function (data) {
                    console.log(data);
                    let event_msg_html = "";
                    $.each(data, function (index, item) {
                        // var bytes = new Uint8Array(item.memberProfilePic);
                        // var blob = new Blob([bytes], { type: "image/png" });
                        // var url = URL.createObjectURL(blob);
                        // console.log(item);
                        // console.log(item.memberProfilePic)
                        // console.log(url);

                        const bytesStr = atob(item.memberProfilePic);
                        let len = bytesStr.length;
                        const u8Array = new Uint8Array(len);
                        while (len--) {
                            u8Array[len] = bytesStr.charCodeAt(len);
                        }
                        const blob = new Blob([u8Array]);
                        const url = URL.createObjectURL(blob);
                        if (login_memberId == item.memberId) {
                            event_msg_html += "<div class='event_msg' data-eventmsgid='" + item.eventMsgId + "'>";
                            event_msg_html += "<img class='member_pic' src='" + url + "'>";
                            event_msg_html += "<li class='member_name' data-msgownerid='" + item.memberId + "'>" + item.memberName + "???</li>";
                            event_msg_html += "<li class='msg_content'>" + item.msgContent + "</li>";
                            event_msg_html += "<button class='msg_report_btn -none'>Report</button>";
                            event_msg_html += "</div>";
                        } else {
                            event_msg_html += "<div class='event_msg' data-eventmsgid='" + item.eventMsgId + "'>";
                            event_msg_html += "<img class='member_pic' src='" + url + "'>";
                            event_msg_html += "<li class='member_name' data-msgownerid='" + item.memberId + "'>" + item.memberName + "???</li>";
                            event_msg_html += "<li class='msg_content'>" + item.msgContent + "</li>";
                            event_msg_html += "<button class='msg_report_btn'>Report</button>";
                            event_msg_html += "</div>";
                        }
                        $("div.event_msg_list").html(event_msg_html);
                    })


                }
            })
        }
    })
})

//=========================== SEND EVENT_WISH_LIST TO DATABASE ===========================

$(document).on("click", "div.event_wish_heart", function () {
    console.log(login_memberId == "null")
    if (login_memberId == "null") {
        $("div.login_modal_bcg").removeClass("-none");
        $("div.login_modal").removeClass("-none");
    } else {
        let eventWishList = JSON.stringify({
            "memberId": login_memberId,      //set as 2 for test, need to catch login memberId
            "eventId": $("li.event_id").val()
        })

        $.ajax({
            url: "../wishlistEvent/addWishlistEvent",
            type: "POST",
            contentType: 'application/json',
            data: eventWishList,
            dataType: "json",
            beforeSend: function () {
            },
            success: function (data) {
                $("div.event_wish_heart").removeClass("-on");
                $("div.event_wish_heart_filled").addClass("-on");
            }
        })
    }
})
//=========================== DELETE EVENT_WISH_LIST FROM DATABASE ===========================
$(document).on("click", "div.event_wish_heart_filled", function () {

    let eventWishList = JSON.stringify({
        "memberId": login_memberId,      //set as 2 for test, need to catch login memberId
        "eventId": $("li.event_id").val()
    })

    $.ajax({
        url: "../wishlistEvent/deleteWishlistEventByMemIdEventId",
        type: "POST",
        contentType: 'application/json',
        data: eventWishList,
        dataType: "json",
        beforeSend: function () {
        },
        success: function (data) {
            $("div.event_wish_heart").addClass("-on");
            $("div.event_wish_heart_filled").removeClass("-on");
        }
    })
})

//=========================== SEND EVENT_REPORT TO DATABASE ===========================
$(document).on("click", "button.event_report_btn", function (e) {
    e.stopPropagation()
    if (login_memberId == "null") {
        $("div.login_modal_bcg").removeClass("-none");
        $("div.login_modal").removeClass("-none");
    } else {
        $(".lightbox-target2").addClass("-on")
    }
})

$(document).on("click", "button.back_btn", function () {
    $(".lightbox-target2").removeClass("-on");
})

$(document).on("click", "button.send_event_report_btn", function () {
    let r = confirm("???????????????????");
    if (r == true) {
        $.ajax({
            url: "../eventReport/addEventReport",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                "eventId": $("li.event_id").val(),
                "memberId": login_memberId,              //set as 2 for test, need to catch login memberId
                "reportReason": $("div.event_report_content").data("reporttype"),
                "reportDate": new Date().toISOString(),
                "caseStatus": 1
            }),
            dataType: "json",
            beforeSend: function () {
            },
            success: function (data) {
                $(".lightbox-target2").removeClass("-on")
            }
        })
    }
})

//=========================== EDIT BUTTON ===========================
$(document).on("click", "button.edit_btn", function () {
    $("input.event_name").addClass("-on").removeAttr("readonly");
    $("input.event_days").addClass("-on").removeAttr("readonly");
    $("input.assembling_place").addClass("-on").removeAttr("readonly");
    $("input.event_deadline").addClass("-on").removeAttr("disabled");
    $("input.event_start_date").addClass("-on").removeAttr("disabled");
    $("input.max_num_of_people").addClass("-on").removeAttr("readonly");
    $("input.min_num_of_people").addClass("-on").removeAttr("readonly");
    $("input.event_content").removeAttr("readonly");
    $("select.area_option").removeAttr("disabled");
    $("select.north_mountain").removeAttr("disabled");
    $("select.mid_mountain").removeAttr("disabled");
    $("select.south_mountain").removeAttr("disabled");
    $("select.east_mountain").removeAttr("disabled");
    $("select.other_mountain").removeAttr("disabled");
    $("select.difficulty").removeAttr("disabled");
    $("select.stay_type").removeAttr("disabled");
    $("textarea.event_content").removeAttr("readonly");
    $("button.send_btn").removeClass("-none");
    $("button.delete_btn").removeClass("-none");
})
$(document).on("click", "button.send_btn", function () {
    alert("???????????????????");
    var member_id = 1;
    var event_status = 2;
    var event_points = 10;

    $.ajax({
        url: "../event/updateEvent",
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify({
            "eventId": $("li.event_id").val(),
            "memberId": login_memberId,                                                      //set as 1 for test
            "mountainId": $("#mountain_id").val(),
            "eventName": $("input.event_name").val(),
            "eventDays": $("input.event_days").val(),
            "difficulty": $("#difficulty").val(),
            "eventDeadline": $("input.event_deadline").val(),
            "eventStartDate": $("input.event_start_date").val(),
            "stayType": $("#stay_type").val(),
            "minNumOfPeople": $("input.min_num_of_people").val(),
            "maxNumOfPeople": $("input.max_num_of_people").val(),
            "assemblingPlace": $("input.assembling_place").val(),
            "eventContent": $("textarea.event_content").val(),
            "eventStatus": event_status,
            "eventPoints": event_points,
            "eventCurPart": $("li.event_cur_part").val()
        }),
        dataType: "json",
        beforeSend: function () {
        },
        success: function (data) {
            window.location.reload();
        }
    })
})

$(document).on("click", "button.delete_btn", function () {
    let r = confirm("?????????????")
    if (r == true) {
        $.ajax({
            url: "../event/updateEvent",
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify({
                "eventId": $("li.event_id").val(),
                "eventStatus": 0,
                "eventPoints": 0,
            }),
            dataType: "json",
            beforeSend: function () {
            },
            success: function (data) {
                window.location.href = "event.html";
            }
        })
    }
})
//=========================== GET PARTICIPANT INFO IF EXIST===========================
$(document).on("click", "button.join_btn", function (e) {
    e.stopPropagation()
    if (login_memberId == "null") {
        $("div.login_modal_bcg").removeClass("-none");
        $("div.login_modal").removeClass("-none");
    } else {
        console.log(login_memberId)
        if (login_memberId != "undefined") {
            $(".lightbox-target").addClass("-on")
            $.ajax({
                url: "../participant/selectParticipantByMemberId",
                type: "GET",
                contentType: 'application/json',
                data: { "memberId": login_memberId, "eventId": $("li.event_id").val() }, //need to get the login memberId
                dataType: "json",
                beforeSend: function () {
                },
                success: function (data) {

                    if (data.length != 0) {
                        // console.log(data[0])
                        let has_participated = `
                    <div class="join_content">
                        <h3>?????????</h3>
                        <input type="hidden" class="part_id" value="${data[0].partId}">
                        <p>??????????????????</p>
                        <select class="experience" id="experience">
                            <option class="no_experience" id="experience" value="false">????????????</option>
                            <option class="has_experience" id="experience" value="true">?????????</option>
                        </select>
                        <p>???????????????</p>
                        <input type="text" class="phone_number" name="phone_number" value="${data[0].phoneNumber}">
                        <p class="original_participants">????????????</p>
                        <input type="hidden" class="original_participants" value="${data[0].totalParticipants}">
                        <input type="text" class="total_participants" name="total_participants" value="${data[0].totalParticipants}">
                        <button class="edit_participants_btn">????????????</button>
                        <button class="cancel_participate">??????</button>
                        <button class="quit">??????</button>
                    </div>
                    `
                        $("div.lightbox-target").html(has_participated);
                        switch (data[0].experience) {
                            case true:
                                $("option.has_experience").prop('selected', true);
                                $("select.experience").attr("value", true)
                                break;
                            case false:
                                $("option.no_experience").prop('selected', true);
                                $("select.experience").attr("value", false)
                        }

                        // switch (data[0].participation) {
                        //     case true:
                        //         $("option.participate").prop('selected', true);
                        //         $("select.participate").attr("value", true)
                        //         break;
                        //     case false:
                        //         $("option.no_participate").prop('selected', true);
                        //         $("select.participate").attr("value", false)
                        // }

                    }
                    else {
                        let no_participate = `
                    <div class="join_content">
                        <h3>????????????</h3>
                        <p>??????????????????</p>
                        <select class="experience" id="experience">
                            <option class="no_experience" id="experience" value="false">????????????</option>
                            <option class="has_experience" id="experience" value="true">?????????</option>
                        </select>
                        <p>???????????????</p>
                        <input type="text" class="phone_number" name="phone_number">
                        <p>????????????</p>
                        <input type="hidden" class="original_participants" value="0">
                        <input type="text" class="total_participants" name="total_participants">
                        <button class="send_participants_btn">??????</button>
                        <button class="cancel_participate">??????</button>
                    </div>
                    `
                        $("div.lightbox-target").html(no_participate);
                    }
                }
            })
        } else {
            $("div.login_modal_bcg").removeClass("-none");
            $("div.login_modal").removeClass("-none");
        }
    }
})

//============================== SEND PARTICIPANT TO DATABASE ADN UPDATE EVENT_CUR_PART ========================================
$(document).on("click", "button.send_participants_btn", function () {
    var memberId = 2;
    $.ajax({

        url: "../participant/addParticipant",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({
            "eventId": $("li.event_id").val(),
            "memberId": login_memberId,
            "experience": $("select.experience").val(),
            "phoneNumber": $("input.phone_number").val(),
            "joinDate": new Date().toISOString(),
            "totalParticipants": $("input.total_participants").val()
        }),
        dataType: "json",
        beforeSend: function () {
        },
        success: function (data) {

            var member_id = 1;
            var event_status = 2;
            var event_points = 10;
            // var event_cur_part = (parseInt($("li.event_cur_part").val()) + parseInt($("input.total_participants").val()));
            var pre_calculate = (parseInt($("li.event_cur_part").val()) - parseInt($("input.original_participants").val()));
            var event_cur_part = (pre_calculate + parseInt($("input.total_participants").val()));
            //========= UPDATE EVENT_CUR_PART AFTER ADD PARTICIPANTS =========
            $.ajax({
                url: "../event/updateEvent",
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify({
                    "eventId": $("li.event_id").val(),
                    "memberId": login_memberId,                                                      //set as 1 for test
                    "mountainId": $("#mountain_id").val(),
                    "eventName": $("input.event_name").val(),
                    "eventDays": $("input.event_days").val(),
                    "difficulty": $("#difficulty").val(),
                    "eventDeadline": $("input.event_deadline").val(),
                    "eventStartDate": $("input.event_start_date").val(),
                    "stayType": $("#stay_type").val(),
                    "minNumOfPeople": $("input.min_num_of_people").val(),
                    "maxNumOfPeople": $("input.max_num_of_people").val(),
                    "assemblingPlace": $("input.assembling_place").val(),
                    "eventContent": $("textarea.event_content").val(),
                    "eventStatus": event_status,
                    "eventPoints": event_points,
                    "eventCurPart": event_cur_part
                }),
                success: function (data) {
                    $(".lightbox-target").removeClass("-on")
                    // console.log(event_cur_part)
                }
            })
        }
    })
})
//========================== UPDATE PARTICIPANT INFO ============================
$(document).on("click", "button.edit_participants_btn", function () {
    var memberId = 2;

    $.ajax({
        url: "../participant/updateParticipant",
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify({
            "partId": $("input.part_id").val(),
            "eventId": $("li.event_id").val(),
            "memberId": login_memberId,
            "experience": 1,
            "phoneNumber": $("input.phone_number").val(),
            "totalParticipants": $("input.total_participants").val()
        }),
        dataType: "json",
        beforeSend: function () {
        },
        success: function (data) {
            var member_id = 1;
            var event_status = 2;
            var event_points = 10;
            var pre_calculate = (parseInt($("li.event_cur_part").val()) - parseInt($("input.original_participants").val()));
            var event_cur_part = (pre_calculate + parseInt($("input.total_participants").val()));

            //========= UPDATE EVENT_CUR_PART AFTER UPDATE PARTICIPANTS =========
            $.ajax({
                url: "../event/updateEvent",
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify({
                    "eventId": $("li.event_id").val(),
                    "memberId": $("li.event_owner").data("ownerid"),                                                      //set as 1 for test
                    "mountainId": $("#mountain_id").val(),
                    "eventName": $("input.event_name").val(),
                    "eventDays": $("input.event_days").val(),
                    "difficulty": $("#difficulty").val(),
                    "eventDeadline": $("input.event_deadline").val(),
                    "eventStartDate": $("input.event_start_date").val(),
                    "stayType": $("#stay_type").val(),
                    "minNumOfPeople": $("input.min_num_of_people").val(),
                    "maxNumOfPeople": $("input.max_num_of_people").val(),
                    "assemblingPlace": $("input.assembling_place").val(),
                    "eventContent": $("textarea.event_content").val(),
                    "eventStatus": event_status,
                    "eventPoints": event_points,
                    "eventCurPart": event_cur_part
                }),
                success: function (data) {
                    $(".lightbox-target").removeClass("-on")
                    // console.log(event_cur_part)
                }
            })
        }
    })
})
//========================== QUIT ============================
$(document).on("click", "button.quit", function () {
    let r = confirm("?????????????");
    if (r == true) {
        $.ajax({
            url: "../participant/deleteParticipantByMemIdEventId",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                "eventId": $("li.event_id").val(),
                "memberId": login_memberId,
            }),
            dataType: "json",
            beforeSend: function () {
            },
            success: function (data) {
                var member_id = 1;
                var event_status = 2;
                var event_points = 10;
                var pre_calculate = (parseInt($("li.event_cur_part").val()) - parseInt($("input.original_participants").val()));
                var event_cur_part = (pre_calculate + parseInt($("input.total_participants").val()));

                //========= UPDATE EVENT_CUR_PART AFTER UPDATE PARTICIPANTS =========
                $.ajax({
                    url: "../event/updateEvent",
                    type: "PUT",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "eventId": $("li.event_id").val(),
                        "memberId": $("li.event_owner").data("ownerid"),                                                      //set as 1 for test
                        "mountainId": $("#mountain_id").val(),
                        "eventName": $("input.event_name").val(),
                        "eventDays": $("input.event_days").val(),
                        "difficulty": $("#difficulty").val(),
                        "eventDeadline": $("input.event_deadline").val(),
                        "eventStartDate": $("input.event_start_date").val(),
                        "stayType": $("#stay_type").val(),
                        "minNumOfPeople": $("input.min_num_of_people").val(),
                        "maxNumOfPeople": $("input.max_num_of_people").val(),
                        "assemblingPlace": $("input.assembling_place").val(),
                        "eventContent": $("textarea.event_content").val(),
                        "eventStatus": event_status,
                        "eventPoints": event_points,
                        "eventCurPart": pre_calculate
                    }),
                    success: function (data) {
                        $(".lightbox-target").removeClass("-on")
                        // console.log(event_cur_part)
                    }
                })
            }
        })
    }
})


//=========================== SEND EVENT_MSG TO DATABASE ===========================
$(document).on("click", "button.add_msg_btn", function () {
    if (login_memberId == "null") {
        $("div.login_modal_bcg").removeClass("-none");
        $("div.login_modal").removeClass("-none");
    } else {
        let eventId = $("li.event_id").val();
        let memberId = 2;
        let msgDate = new Date().toISOString();
        let msgContent = $("input.add_msg").val();
        let msgStatus = 1;

        $.ajax({
            url: "../eventMsg/addEventMsg",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                "eventId": eventId,
                "memberId": login_memberId,
                "msgDate": msgDate,
                "msgContent": msgContent,
                "msgStatus": msgStatus
            }),
            dataType: "json",
            beforeSend: function () {
            },
            success: function (data) {

                //================= GET MEMBER ID, MEMBER NAME, MEMBERPIC FROM DATABASE ==============
                // console.log("123");
                $.ajax({
                    url: `../member/findMemberByIdForEventMsg?memberId=${login_memberId}`,
                    type: "GET",
                    contentType: 'application/json',
                    // data: JSON.stringify({
                    //     "memberId": login_memberId
                    // }),
                    success: function (data) {
                        // console.log(data)
                        // $.each(data, function (index, item) {
                        //     console.log(item.memberProfilePic);
                        // })
                        // var mbytes = new Uint8Array(data.memberProfilePic);
                        // var mblob = new Blob([mbytes], { type: "image/png" });
                        // var murl = URL.createObjectURL(mblob);

                        const bytesStr = atob(data.memberProfilePic);
                        let len = bytesStr.length;
                        const u8Array = new Uint8Array(len);
                        while (len--) {
                            u8Array[len] = bytesStr.charCodeAt(len);
                        }
                        const blob = new Blob([u8Array]);
                        const murl = URL.createObjectURL(blob);

                        $("div.event_msg_list").prepend(`
                                <div class="event_msg">
                                    <img class="member_pic" src="${murl}">
                                    <li class="member_name">${login_memberName}???</li>
                                    <li class="msg_content">${$("input.add_msg").val()}</li>
                                    <button class="msg_report_btn -none">Report</button>
                                </div>
                        `)
                        $("input.add_msg").val("");
                    }
                })
            }
        })
    }
})

$(document).on("click", "button.msg_report_btn", function (e) {
    e.stopPropagation()
    if (login_memberId != "null") {
        $(".lightbox-target3").addClass("-on")
        $("div.msg_report_content").attr("data-eventmsgid", $(this).closest("div").data("eventmsgid"))
    } else {
        $("div.login_modal_bcg").removeClass("-none");
        $("div.login_modal").removeClass("-none");
    }
})

$(document).on("click", "button.send_msg_report_btn", function () {
    let that = this;
    console.log($("div.msg_report_content").data("eventmsgid"))
    console.log($("div.msg_report_content").data("reporttype"))
    console.log(login_memberId)
    let r = confirm("???????????????????");
    if (r == true) {
        // $.ajax({
        //     url: "../msgReport/addEventMsgReport",
        //     type: "POST",
        //     contentType: 'application/json',
        //     data: JSON.stringify({
        //         "memberID": login_memberId,
        //         "reportReason": $("div.msg_report_content").data("reporttype"),
        //         "reportDate": new Date().toISOString(),
        //         "caseStatus": 1,
        //         "eventMsgID": $("div.msg_report_content").data("eventmsgid"),
        //         "actMsgID": 1
        //     }),
        //     dataType: "json",
        //     beforeSend: function () {
        //     },
        //     success: function (data) {
        //         $(".lightbox-target3").removeClass("-on")
        //     }
            
        // })
        $(".lightbox-target3").removeClass("-on")
    }
})
