$(function () {
	$.ajax({
		url : "Colleage/" + $("#colleage_colleageNumber_edit").val() + "/update",
		type : "get",
		data : {
			//colleageNumber : $("#colleage_colleageNumber_edit").val(),
		},
		beforeSend : function () {
			$.messager.progress({
				text : "正在获取中...",
			});
		},
		success : function (colleage, response, status) {
			$.messager.progress("close");
			if (colleage) { 
				$("#colleage_colleageNumber_edit").val(colleage.colleageNumber);
				$("#colleage_colleageNumber_edit").validatebox({
					required : true,
					missingMessage : "请输入学院编号",
					editable: false
				});
				$("#colleage_colleageName_edit").val(colleage.colleageName);
				$("#colleage_colleageName_edit").validatebox({
					required : true,
					missingMessage : "请输入学院名称",
				});
			} else {
				$.messager.alert("获取失败！", "未知错误导致失败，请重试！", "warning");
				$(".messager-window").css("z-index",10000);
			}
		}
	});

	$("#colleageModifyButton").click(function(){ 
		if ($("#colleageEditForm").form("validate")) {
			$("#colleageEditForm").form({
			    url:"Colleage/" +  $("#colleage_colleageNumber_edit").val() + "/update",
			    onSubmit: function(){
					if($("#colleageEditForm").form("validate"))  {
	                	$.messager.progress({
							text : "正在提交数据中...",
						});
	                	return true;
	                } else {
	                    return false;
	                }
			    },
			    success:function(data){
			    	$.messager.progress("close");
                	var obj = jQuery.parseJSON(data);
                    if(obj.success){
                        $.messager.alert("消息","信息修改成功！");
                        $(".messager-window").css("z-index",10000);
                        //location.href="frontlist";
                    }else{
                        $.messager.alert("消息",obj.message);
                        $(".messager-window").css("z-index",10000);
                    } 
			    }
			});
			//提交表单
			$("#colleageEditForm").submit();
		} else {
			$.messager.alert("错误提示","你输入的信息还有错误！","warning");
			$(".messager-window").css("z-index",10000);
		}
	});
});
