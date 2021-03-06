<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% String contextPath = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>訂單完成</title>
    <link rel="stylesheet" type="text/css" href="<%=contextPath%>/shop/code/style.css">


</head>

<body>
    <!-- 插入 商城頁首-->
<%@ include file="goods_header.jsp" %>


    <!-- 商店首頁 開始-->
    <div class="goodsindex_bodycontent paymentPage">

        <div class="goodsindex_innercontent ">
            <ul class="cart_top_title_area_01">
                <li>查看購物車</li>
                <li><i class="fas fa-arrow-circle-right"></i></li>
                <li>訂單確認</li>
                <li style="color: rgb(51, 51, 51);"><i class="fas fa-arrow-circle-right"></i></li>
                <li style="color: rgb(51, 51, 51);">訂單完成</li>
            </ul>
            <div class="goods_title01 ">訂單完成</div>
            <ul class="payment_complete_detail">
                <li>
					<table style="  width:400px ; align:center" cellpadding='5' >
						<colgroup>
							<col >
							<col span="3">
						</colgroup>
						<tr >
							<th >您的訂單編號</th>
							<th>訂單建立時間</th>
							<th>訂單金額</th>
						</tr>
						<c:forEach items="${finalOrderList}" var="order" varStatus="s">
							<tr>
								<td>${order.order_id}</td>
								<td>${order.order_created_date}</td>
								<td>NT &ensp;${order.order_sum_after}</td>
							</tr>
              		    </c:forEach>
					</table> 
              	</li>
                <li>目前訂單狀態：等待店家確認訂單。</li>
                <li>&ensp;</li>
                <li>山山來此與店家在此感謝您的購買與支持。</li>
            </ul>
        </div>
    </div>

    <!-- 商店首頁 結束-->

    <!-- 插入 商城頁尾-->
<%@ include file="goods_footer.jsp" %>

    <!-- 載入jQuery -->
    <!-- <script type='text/javascript' src='<%=contextPath%>/shop/code/jquery-3.6.0.js'></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- 載入jQuery form-->
    <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.3.0/jquery.form.js"></script>
    <!-- 載入index.js -->
    <script type='text/javascript' src='<%=contextPath%>/shop/code/header.js'></script>
    <!-- 載入icon -->
    <script src="https://kit.fontawesome.com/8cfc21ab70.js" crossorigin="anonymous"></script>
</body>

</html>