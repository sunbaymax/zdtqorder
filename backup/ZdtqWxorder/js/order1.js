$(function() {

	window.alert = function(name) {
		var iframe = document.createElement("IFRAME");
		iframe.style.display = "none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	}

	function GetDateStr(AddDayCount) {
		var dd = new Date();
		dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1; //获取当前月份的日期
		var d = dd.getDate();
		return y + "-" + m + "-" + d;
	}
	var date = [GetDateStr(0), GetDateStr(1), GetDateStr(2)];

	
	$('.clear').on('click', function() {
		sessionStorage.removeItem('order');
		location.reload();
	})
	//寄件人地址薄选择
	$(".sendaddress").on("click", function() {
		var _ChaddreType = 'send';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.removeItem('Inmain');
		location.href = 'addressbook.html';

	})
	//寄件人地址编辑
	$(".existsend").on("click", function() {
		var _ChoseaddData = JSON.parse(localStorage.getItem('SendaddData'));
		var _ChaddreType = 'send';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.setItem('Inmain', "Insendinfo");
		//		localStorage.removeItem('Inmain');
		localStorage.removeItem('mystate')
		location.href = 'InfoInput.html?id=' + _ChoseaddData.id;

	})
	//收件人地址编辑
	$(".existget").on("click", function() {
		var _ChoseaddData = JSON.parse(localStorage.getItem('getaddData'));
		var _ChaddreType = 'get';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.removeItem('mystate')
		localStorage.setItem('Inmain', "Ingetinfo");
		location.href = 'InfoInput.html?id=' + _ChoseaddData.id;
	})
	//收件人地址薄选择
	$(".getaddress").on("click", function() {
		var _ChaddreType = 'get';
		localStorage.removeItem('Inmain');
		localStorage.setItem('ChaddreType', _ChaddreType);
		location.href = 'addressbook.html';
	})

	//新增寄件人地址
	$(".Noexistsend").on("click", function() {
		var _ChaddreType = 'send';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.setItem('Inmain', "Insendinfo");
		localStorage.removeItem('mystate')
		location.href = 'Addsendress.html';
	})
	//新增收件人地址
	$(".Noexistget").on("click", function() {
		var _ChaddreType = 'get';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.removeItem('mystate')
		localStorage.setItem('Inmain', "Ingetinfo");
		location.href = 'Addgetaddress.html';
	})

	function toggleBody(isPin) {

		if(isPin) {

			document.body.style.height = '100vh'

			document.body.style['overflow-y'] = 'hidden'
		} else {

			document.body.style.height = 'unset'

			document.body.style['overflow-y'] = 'auto'

		}
	}

	//toggleBody(1)  //在跳出弹窗的时候
	//toggleBody(0)  //弹窗消失的时候
	$(".yin").on('click', function() {
		$(".setbg").hide();
		$('body,html').animate({
			scrollTop: 0
		}, 0);
	})

	$(".closewindow").on('click', function() {
		$(".setbg").hide();
	})

	//点击温度区间
	var wdqj = [];
	$.ajax({
		type: "post",
		url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/Wdqj.php",
		async: false,
		data: {
			state: 'wdqj'
		},
		dataType: 'JSON',
		success: function(res) {

			$.each(res.data, function(index, val) {

				wdqj.push(val.WDQJ);
			});

		},
		error: function(err) {

		}
	});

	//点击货物类型
	$(".cgoodtype").on('click', function() {
		//查看当前选中的箱子
		$('body,html').animate({
			scrollTop: 0
		}, 0);
		$('.acountlist').hide();
		$(".setbg").show();
		$(".goodsType").show();
		$(".Temparea").hide();
		$(".BoxType").hide();
		$(".TimeType").hide();
		$(".BoxSize").hide();
		if($('#Goodstypes').text() == '请选择货物类型' && $('#Temparea').text() == '请选择温区' && $('#BoxType').text() == '请选择箱型' && $('#ChooseTimes').text() == '预约取件时间') {
			$('.btndiv button').attr('disabled', true);
		} else {
			$('.btndiv button').removeAttr("disabled");
			$(".btndiv button").css('background', '#12599B');
		}

	})

	//点击预约时间
	var mytime = '';
	$(".clickTime").on('click', function() {
		$("#popup").show()
		this.isShow = true;

	})
	$(".bar.bar-1 img").on("click", function() {
		$("#popup").hide()
	})
	$(".Temparea-Ways .Tempareac .ni").on('click', function() {
		$(this).parents('.Temparea-Ways').find('.ni').removeClass('spanActive');
		$(this).addClass('spanActive');
		if($(this).parent().attr("class").indexOf("Dryice") != -1) {
			$('.BoxTypef1 .ni').removeClass('disable');
			$('.BoxTypef2').hide();
			$('.BoxTypef1').show();
			$('.BoxTypef2 .ni').addClass('disable');
			$('.BoxTypef2 .ni').removeClass('spanActive');
		} else {
			$('.BoxTypef1').hide();
			$('.BoxTypef2').show();
			$('.BoxTypef1 .ni').addClass('disable');
			$('.BoxTypef2 .ni').removeClass('disable');
			$('.BoxTypef1 .ni').removeClass('spanActive');
		}

	});
	var arrCbox = [];
	$(".BoxType .ni").on('click', function() {
		if($(this).attr('class').indexOf("spanActive") != -1) {
			$(this).removeClass('spanActive')
		} else {
			$(this).addClass('spanActive');
		}
	});

	var arrcBoxTxts = [];
	//点击时间日期
	$(".TimeType-Ways .TimeType-day .ni").on('click', function() {
		$(this).siblings().removeClass('spanActive');
		$(this).addClass('spanActive');
		$(this).find('img').show();
		$(this).siblings().find('img').hide();
		if($(this).find('.ri').text() == '明日' || $(this).find('.ri').text() == '后日') {
			$('.TimeType-datetime').empty();
			let currtime = ['8:30-10:30', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
			$(currtime).each(function(key, index) {
				let str = '<span class="ni">';
				str += index;
				str += '</span>';
				$('.TimeType-datetime').append(str);
			});
		} else {
			let currhour = d.getHours();
			$('.TimeType-datetime').empty();
			if(currhour < 0 || currhour > 24) {
				currtime = ['无效时间']
			} else if(currhour >= 6 && currhour < 17) {
				currtime = ['2小时上门', '8:30-10:30', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
			} else {
				currtime = ['非正常预约时间'];
			}
			$(currtime).each(function(key, index) {
				let str = '';
				if(currhour <= 8) {
					str = '<span class="ni">';
					str += index;
					str += '</span>';
				} else if(currhour >= 10 && currhour < 12) {
					if(key == 1) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else if(currhour >= 12 && currhour < 14) {
					if(key == 1 || key == 2) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else if(currhour >= 14 && currhour < 16) {
					if(key >= 1 && key <= 3) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else {
					str = '<span class="ni disable">';
					str += index;
					str += '</span>';
				}
				$('.TimeType-datetime').append(str);
			});
		}
	});
	//监听备注录入
	$(".note .time-right textarea").bind("input propertychange", function(event) {
		if($('#Goodstypes').text() == '请选择货物类型' && $('#Temparea').text() == '请选择温区' && $('#BoxType').text() == '请选择箱型' && $('#ChooseTimes').text() == '预约取件时间') {
			$('.btndiv button').attr('disabled', true);
		} else {
			$('.btndiv button').removeAttr("disabled");
			$(".btndiv button").css('background', '#12599B');
		}
	});
	//点击小时
	$('body').on('click', ".TimeType-Ways .TimeType-datetime .ni", function() {
		$(this).siblings().removeClass('spanActive');
		$(this).addClass('spanActive');
	});

	$(".Temparea-btn").on('click', function() {
		var chooseTempTxt = $('.Temparea .spanActive').text();
		if(chooseTempTxt == '') {
			alert("请选择温度区间");
			$("#Temparea").removeClass('chooseTemp');
			$(".fatherbox .choosewenqu .gw_num").removeClass('hide');
		} else {
			$("#Temparea").text(chooseTempTxt);
			$("#Temparea").addClass('chooseTemp');
			$("#BoxType").text('请选择箱型');
			$('.BoxType .BoxType-Ways .ni').removeClass('spanActive');
			$(".fatherbox .choosewenqu p").addClass('hide');
			$('.childbox').remove();
			arrcBoxTxts = [];
			$('.choosewenqu .gw_num input').val('1');
			$(".setbg").hide();
			$(".setbg").hide();
		}
	});

	//货物类型确定
	$(".Goodstype-btn").on('click', function() {
		var chooseGoodtypeTxt = $('.goodsType  .Tempareac .spanActive').text();
		if(chooseGoodtypeTxt == '') {
			alert("请选择货物类型");
		} else {
			$("#Goodstypes").text(chooseGoodtypeTxt);
			$("#Goodstypes").addClass('Cgoods');

			$(".setbg").hide();
		}
	});

	//删除选择的箱型
	$("body").on("click", '.childbox .delbox', function() {
		var deltext = $(this).prev().text();
		$(".BoxType-Ways .spanActive").each(function() {
			if($(this).text().indexOf(deltext) != -1) {
				$(this).removeClass('spanActive')
			}
		});
		arrcBoxTxts.remove(deltext);
		console.log(arrcBoxTxts);
		$(this).parents('.childbox').remove();

	})
	$(".time-btn").on('click', function() {
		var chooseDay = $('.TimeType-day .spanActive .qi').text();
		var chooseTimeTxt = $('.TimeType-datetime .spanActive').text();
		$("#ChooseTimes").text(chooseDay + ' ' + chooseTimeTxt);
		$(".time .time-right label").addClass("chooseTimes");
		$(".setbg").hide();
	});
	$('aside.slide-wrapper').on('touchstart', 'li', function(e) {
		$(this).addClass('current').siblings('li').removeClass('current');
	});

	$('a.slide-menu').on('click', function(e) {
		var wh = $('div.wrapper').height();
		$('div.slide-mask').css('height', '100%').show();
		$('aside.slide-wrapper').css('height', '100%').addClass('moved');
	});

	$('div.slide-mask').on('click', function() {
		$('div.slide-mask').hide();
		$('aside.slide-wrapper').removeClass('moved');
	});
	$('.menu_top img').on('click', function() {
		$('div.slide-mask').hide();
		$('aside.slide-wrapper').removeClass('moved');
	});
	//提取汉字
	function  GetChinese(strValue)  {     
		if(strValue !=  null  &&  strValue !=  "") {         
			var  reg  =  /[\u4e00-\u9fa5]/g;          
			return  strValue.match(reg).join("");      
		}      
		else   
			return  "";  
	} 
	//去掉汉字
	function  RemoveChinese(strValue)  {     
		if(strValue !=  null  &&  strValue  !=  "") {         
			var  reg  =  /[\u4e00-\u9fa5]/g;         
			return  strValue.replace(reg, "");      
		}      
		else 
			return  "";  
	} 
	function trimstart(v) { //去除字符串尾空白
		if(typeof v == 'string') return v.replace(/^\s+/, '')
		return v;
	}

	function replacepos(text, start, stop, replacetext) {
		mystr = text.substring(0, stop - 1) + replacetext + text.substring(stop + 1);
		return mystr;
	}

	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
			" " + date.getHours() + seperator2 + date.getMinutes() +
			seperator2 + date.getSeconds();
		return currentdate;
	}

	var boxsize = [];
	var objboxsize = {};
	//确定尺寸
	$(".BoxSize-btn").on("click", function() {
		var lang = $('.lang').val();
		var wide = $('.wide').val();
		var high = $('.high').val();
		if(lang == '') {
			alert('长度不能为空');
		} else if(wide == '') {
			alert('宽度不能为空');
		} else if(high == '') {
			alert('高度不能为空');
		} else {
			objboxsize['lang'] = lang;
			objboxsize['wide'] = wide;
			objboxsize['high'] = high;
			if(objboxsize['nums'] == '' || objboxsize['nums'] == undefined || objboxsize['nums'] == 0) {
				objboxsize['nums'] = 1;
			}
			$('.CTemporSize .goodsize').addClass('activeexist');
			$('.fatherboxsize').show();
			var inputboxsize = lang + '*' + wide + '*' + high + 'cm';
			$('.fatherboxsize #BoxType').text(inputboxsize);
			$(".setbg").hide();
			$(".goodsType").hide();
			$(".Temparea").hide();
			$(".BoxType").hide();
			$(".TimeType").hide();
			$(".BoxSize").show();
			console.log(objboxsize);
		}

	})

	$('.high').blur(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 0);
	})

	$("body").on("click", ".fatherboxsize .gw_num .add", function() {
		var n = $(this).prev().val();
		var num = parseInt(n) + 1;
		if(num == 0) {
			return;
		}
		$(this).prev().val(num);
		objboxsize['nums'] = num;
		console.log(objboxsize)

	});
	//减的效果
	$("body").on("click", ".fatherboxsize .gw_num .jian", function() {
		var n = $(this).next().val();
		var num = parseInt(n) - 1;
		if(num == 0) {
			for(var key in objboxsize) {
				delete objboxsize[key];
			}
			console.log(objboxsize);
			$(".fatherboxsize").hide();
			$('.CTemporSize .goodsize').removeClass('activeexist');

		}

		if(num != 0) {
			$(this).next().val(num);
			objboxsize['nums'] = num;

		}
		console.log(objboxsize)
	});

	//点击头像跳转
	$(".menu_footer").on("click", function() {
		location.href = 'person.html';
	})

	$(".alldizhi").on("click", function(res) {
		location.href = 'Alladdressbook.html';
		console.log("123");
		localStorage.setItem('state', 'all');
		localStorage.setItem('ChaddreType', 'all');
	})
	$(".CTemporSize span").on("click", function() {
		$(this).addClass('active');
		if($(this).text() == '货物尺寸') {
			if($("#Tempqu").text() == '请选择温区') {
				alert("请选择温度区间");
				return false;
			}
			$(".setbg").show();
			$(".BoxSize").show();
			$(".goodsType").hide();
			$(".Temparea").hide();
			$(".BoxType").hide();
			$(".TimeType").hide();

		} else {

			if($("#Tempqu").text() == '请选择温区') {
				alert("请选择温度区间");
				return false;
			} else {
				$('.acountlist').hide();
				$(".setbg").show();
				$(".goodsType").hide();
				$(".Temparea").hide();
				$(".TimeType").hide();
				$(".BoxSize").hide();
				if(corderboxs.length >= 1) {
					$(".BoxType").show();
					var temd = $("#Tempqu").text();
					tempboxtype(temd);
					//					
					//					var divs = $('.BoxType').find(".BoxType-Ways .boxone");
					//					$.each(divs, function(index, domEle) {
					//						$(this).find('.num').val("2");　　
					//						$.each(corderboxs, function(j, val) {
					//							if(val.PackageName == $(this).find('.TboxType').text()) {
					//								$(this).find('.num').val(val.Num);
					//
					//							}
					//						});
					//
					//					});
				} else {
					var temd = $("#Tempqu").text();
					tempboxtype(temd);
					$(".BoxType").show();
				}

			}
			if($('#Goodstypes').text() == '请选择货物类型' && $('#Temparea').text() == '请选择温区' && $('#BoxType').text() == '请选择箱型' && $('#ChooseTimes').text() == '预约取件时间') {

				$('.btndiv button').attr('disabled', true);
			} else {

				$('.btndiv button').removeAttr("disabled");
				$(".btndiv button").css('background', '#12599B');
			}
		}

	})

	//根据温区查找箱型
	function tempboxtype(wdqj) {
		$('body,html').animate({
			scrollTop: 0
		}, 0);
		var _wdqj = wdqj;
		$.ajax({
			type: "post",
			url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/Wdqj.php",
			data: {
				state: "box",
				WDQJ: _wdqj
			},
			dataType: "JSON",
			success: function(res) {
				
				if(res.code == '200') {
						if(corderboxs.length>0){
							var boxstrs = '';
							var boxstrs2={};
                            corderboxs.forEach(function(index2, item2) {
                            	boxstrs2[index2.PackageName] = index2.Num;
                            	// console.log(index2,123456)
							})
						    $('.BoxType .BoxType-Ways').html("");
						    
						    res.data.forEach(function(index, item){
								    boxstrs = `<div class='boxone'><p><span class="TboxType">${index.PackageType}</span><span class="TboxTypeSize">${index.NSize}</span></p>`;
                                  if(boxstrs2[index.PackageType]>0){
                                      boxstrs += `<p class="gw_num">
														<img src="../img/reduce.png" class="jian">
														<input type="text"  class="num" value='${boxstrs2[index.PackageType]}' readonly="readonly">
														<img src="../img/addbox.png" class="add">
														</p>`;
								  }else {
                                      boxstrs += `<p class="gw_num">
															<img src="../img/reduce.png" class="jian" style="display: none;">
															<input type="text"  class="num" style="display: none;" readonly="readonly">
															<img src="../img/addbox.png" class="add">
															</p>`;
								  }
										boxstrs+=`</div>`;
									 $('.BoxType .BoxType-Ways').append(boxstrs);	
							});
						}else{
							var boxstrs = '';
							$.each(res.data, function(index, item) {
							
									boxstrs = `<div class='boxone'> 
									<p><span class="TboxType">${item.PackageType}</span><span class="TboxTypeSize">${item.NSize}</span></p>
									<p class="gw_num">
										<img src="../img/reduce.png" class="jian" style="display: none;">
										<input type="text"  class="num" style="display: none;" readonly="readonly">
										<img src="../img/addbox.png" class="add">
									</p>
								    </div>`;
									$('.BoxType .BoxType-Ways').append(boxstrs);
								
		
							});
                   }
				}

			},
			error: function(err) {
				console.log(err)
			}
		});
	}

	//点击使用温度计
	var togglewdj = true;
	$("#usewdj").click(function() {
		if(togglewdj) {
			$(this).attr("src", "../img/wenduji.png");
			$(this).attr("isuse", "1");
			togglewdj = false;
		} else {
			$(this).attr("src", "../img/bushiyong.png");
			$(this).attr("isuse", "0");
			togglewdj = true;
		}
	});
	//点击投保
	var toggletoubao = true;
	$("#clicktoubao").click(function() {
		if(toggletoubao) {
			$(this).attr("src", "../img/baojiafanliguanli.png");
			$(this).attr("istoubao", "1");
			$(this).parent().next().find('span').css("color", "#1c84c6");
			$(this).parent().next().find('input').css("color", "#1c84c6");
			$(this).parent().next().find('input').val("");
			toggletoubao = false;
		} else {
			$(this).attr("src", "../img/butoubao.png");
			$(this).attr("istoubao", "0");
			$(this).parent().next().find('span').css("color", "#999999");
			$(this).parent().next().find('input').css("color", "#999999");
			$(this).parent().next().find('input').val("2000");
			toggletoubao = true;
		}
	});
	//正在选箱型添加
	$('body').on("click", ".BoxType .boxone .add", function() {
		var cboxnum = $(this).parent().find('input').val();

		if(cboxnum == '') {
			$(this).parent().find('input').show();
			$(this).parent().find('.jian').show();
			$(this).parent().find('input').val("1");
		} else {
			cboxnum = parseInt(cboxnum) + 1;
			$(this).parent().find('input').val(cboxnum);
		}

	})
	//选好的箱型添加
	$('body').on("click", ".orderbox .gw_num .add", function() {
		var chooseboxnum = $(this).parent().find('input').val();
		var chooseboxnames = $(this).parents('.choosewenqu').find('.Cchildbox').text();
		if(chooseboxnum == '') {
			$(this).parent().find('input').show();
			$(this).parent().find('.jian').show();
			$(this).parent().find('input').val("1");
		} else {
			chooseboxnum = parseInt(chooseboxnum) + 1;
			$(this).parent().find('input').val(chooseboxnum);
			for(var i = 0; i < corderboxs.length; i++) {
				if(corderboxs[i].PackageName == chooseboxnames) {
					corderboxs[i].Num = chooseboxnum;
				}

			}
		}
	})
	//箱型减少
	$('body').on("click", ".BoxType .boxone .jian", function() {
		var cboxnum = $(this).parent().find('input').val();
		cboxnum = parseInt(cboxnum) - 1;
		if(cboxnum == 0) {
			$(this).parent().find('input').hide();
			$(this).parent().find('.jian').hide();
			$(this).parent().find('input').val("");
		} else {
			$(this).parent().find('input').val(cboxnum);
		}

	})
	//选好的箱型减少

	$('body').on("click", ".orderbox .gw_num .jian", function() {
		console.log($(this).parents('ul').find('.orderbox').first());

		var reducenum = $(this).parent().find('input').val();
		var cboxnumnames = $(this).parents('.choosewenqu').find('.Cchildbox').text();
		reducenum = parseInt(reducenum) - 1;
		if(reducenum == 0) {
			if(corderboxs.length == 0) {
				$('.CTemporSize .tempbox').removeClass('activeexist');
			}
			$(this).parents('.orderbox').remove();
		    $(".orderbox").remove();
			$(corderboxs).each(function(index, value) {
				let str = '';
				if(index == (corderboxs.length - 1)) {
					str = `<li class="childbox orderbox">
							<div class='d1'>
								<img src="../img/box.png" class="img_temp view"  />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox">${value.PackageName}</label>
								<img src="../img/xiala.png" class="xiala" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;

				} else {
					str = `<li class="childbox orderbox">
							<div>
								<img src="../img/box.png" class="img_temp" />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox">${value.PackageName}</label>
								<img src="../img/delbox.png" class="delbox" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;
				}
				$('.CTemporSize').after(str);

			});

			$(this).parents('ul').find('.orderbox').first().addClass('view');
			for(var i = 0; i < corderboxs.length; i++) {
				if(corderboxs[i].PackageName == cboxnumnames) {
					corderboxs.splice(i, 1);
				}

			}
			console.log(corderboxs)
		} else {
			$(this).parent().find('input').val(reducenum);
		}

	})
	//		var orderboxs = [];
	//		var objbox = {};
	//		$('.orderbox').each(function(i) {
	//			var cbox = $(this).find('.boxinput').text().replace(/\s/g, "");
	//			var cboxnum = $(this).find('.num').val();
	//			objbox = {
	//				"PackageName": cbox,
	//				"Num": cboxnum
	//			}
	//			orderboxs.push(objbox);
	//		});
	var corderboxs = [];
	var cobjbox = {};
	$(".BoxType-btn").on('click', function() {
		corderboxs.splice(0, corderboxs.length);
		var divs = $(this).parents('.BoxType').find(".BoxType-Ways .boxone");
		$.each(divs, function(index, domEle) {
			if($(this).find('.num').val() != '' || parseInt($(this).find('.num').val()) > 0) {
				cobjbox = {
					"PackageName": $(this).find('.TboxType').text(),
					"Num": parseInt($(this).find('.num').val())
				}
				corderboxs.push(cobjbox);
			}

		});
		if(corderboxs.length > 3) {
			alert("多箱型");
			corderboxs.splice(0, corderboxs.length);
			return false;
		} else {
			$(".setbg").hide();
			$(".BoxType").hide();
			$(".tempbox").addClass('activeexist');
			$('.orderbox').remove();
			$(corderboxs).each(function(index, value) {
				let str = '';
				if(index == (corderboxs.length - 1)) {
					str = `<li class="childbox orderbox">
							<div class='d1'>
								<img src="../img/box.png" class="img_temp view"  />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox">${value.PackageName}</label>
								<img src="../img/xiala.png" class="xiala" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;

				} else {
					str = `<li class="childbox orderbox">
							<div>
								<img src="../img/box.png" class="img_temp" />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox">${value.PackageName}</label>
								<img src="../img/delbox.png" class="delbox" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;
				}
				$('.CTemporSize').after(str);

			});

			console.log(corderboxs)
		}

	});
	var hiswd = '';
	$('#Tempqu').on("click", function() {
		hiswd = $(this).text()
	})
	//选择温区
	var mobileSelect1 = new MobileSelect({
		trigger: '#Tempqu',
		title: '',
		wheels: [{
			data: wdqj
		}],
		position: [0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
		transitionEnd: function(indexArr, data) {
			//console.log(data);
		},
		callback: function(indexArr, data) {

			console.log(hiswd, 00);
			console.log(data, 11);
			if(hiswd != data || hiswd == "请选择温区") {
				console.log("变");
				corderboxs.splice(0, corderboxs.length);
//				console.log(corderboxs);
				$('.orderbox').remove();
				$('.CTemporSize .tempbox').removeClass('activeexist');

			}
			$('#Tempqu').addClass('chooseTemp');
		}
	});
	//点击下单
	$('.btndiv button').on('click', function() {
		if(JSON.parse(localStorage.getItem('SendaddData'))) {
			var sendInfo = JSON.parse(localStorage.getItem('SendaddData'));
			var _Manager = sendInfo.addressname;
			var _Telephone = sendInfo.addresstel;
			var _sendaddress = sendInfo.address.trim().split(/\s+/);
			var _Depart = _sendaddress[0];
			var _City = _sendaddress[1];
			var _Address = _sendaddress[2] + _sendaddress[3];
			var _Company = sendInfo.company;
		} else {
			alert("请选择寄件联系人")
		}

		if(JSON.parse(localStorage.getItem('getaddData'))) {
			var getInfo = JSON.parse(localStorage.getItem('getaddData'));
			var _GetName = getInfo.addressname;
			var _GetTelephone = getInfo.addresstel;
			var _getaddress = getInfo.address.trim().split(/\s+/);
			var _GetDepart = _getaddress[0];
			var _GetCity = _getaddress[1];
			var _GetAddress = _getaddress[2] + _getaddress[3];
			var _GetCompany = getInfo.company;
		} else {
			alert("请选择收件联系人")
		}

		var GoodType = $("#Goodstypes").text();
		var GoodName = $("#goodname").val();
		var TempArea = $("#Tempqu").text();

		var iswdj = $("#usewdj").attr("isuse") == 1 ? "使用" : "不使用";
		var isInsure = $("#clicktoubao").attr("istoubao") == 1 ? "投保" : "不投保";
		var Insuremoney = $('.money').val();
		var _orderTime = $("#ChooseTimes").text();
		var _note = $(".note .time-right textarea").val();

		if(sendInfo == getInfo) {
			alert('寄件人收件人信息一致');
			localStorage.removeItem('getaddData');
		} else if(GoodType == '请选择货物类型') {
			alert("请选择货物类型");
		} else if(TempArea == '请选择温区') {
			alert("请选择温区");
		} else if(objbox.length == 0) {
			alert("请选择箱型");
		} else if(_orderTime == '预约取件时间') {
			alert("请选择预约取件时间 ");
		} else {
			$('.btndiv button').attr('disabled', true);
			var b = (JSON.stringify(objboxsize) == "{}");
			var arrsize = [];
			if(b) {
				var _data = {
					AccountNumber: _account,
					AccountTelephone: _tel,
					Token: "KHWX",
					Manager: _Manager,
					Telephone: _Telephone,
					Depart: _Depart,
					City: _City,
					Address: _Address,
					Company: _Company,
					GetName: _GetName,
					GetTelephone: _GetTelephone,
					GetDepart: _GetDepart,
					GetCity: _GetCity,
					GetAddress: _GetAddress,
					GetCompany: _GetCompany,
					WDQJ: TempArea,
					CargoName: GoodName,
					Name4: iswdj,
					OrderTime: _orderTime,
					BusinessType: GoodType,
					Note: _note,
					SafeItem: isInsure,
					SafePay: Insuremoney,
					Box: corderboxs,
				}
			} else {
				var _data = {
					AccountNumber: _account,
					AccountTelephone: _tel,
					Token: "KHWX",
					Manager: _Manager,
					Telephone: _Telephone,
					Depart: _Depart,
					City: _City,
					Address: _Address,
					Company: _Company,
					GetName: _GetName,
					GetTelephone: _GetTelephone,
					GetDepart: _GetDepart,
					GetCity: _GetCity,
					GetAddress: _GetAddress,
					GetCompany: _GetCompany,
					WDQJ: TempArea,
					CargoName: GoodName,
					Name4: iswdj,
					OrderTime: _orderTime,
					BusinessType: GoodType,
					Note: _note,
					SafeItem: isInsure,
					SafePay: Insuremoney,
					Box: corderboxs,
				}
			}

			console.log(_data)
			return false;
			$.ajax({
				type: "post",
				url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/Order.php",
				data: _data,
				dataType: "json",
				success: function(res) {
					console.log(res)
					if(res.code == '200') {
						var nowtime = getNowFormatDate();
						var openids = ['oTarnv5aWyxLcCENYrs5UOR3FqvQ'];
						for(i = 0; i < openids.length; i++) {
							$.ajax({
								type: "post",
								url: 'http://www.ccsc58.cc/weixinnew/Push_message.php',
								data: {
									first: "您好，您有新的订单需要处理",
									keyword1: res.ID,
									keyword2: '微信下单',
									keyword3: nowtime,
									keyword4: _Manager,
									keyword5: _Depart + ' ' + _City + ' ' + _Address,
									remark: 'TMS查看处理详细订单',
									openId: openids[i],
									app_key: '261AFF68C0E9F076420D083D66222824'

								},
								dataType: "json",
								success: function(res) {
									console.log('tuisong')
								},
								error: function(err) {

								}
							})
						};

						location.href = 'ordersuccess.html';
						sessionStorage.setItem("order", JSON.stringify(_data));
					} else {
						alert(res.msg)
					}
				},
				error: function(err) {
					console.log(err)
				}
			})
		}

	});
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if(index > -1) {
			this.splice(index, 1);
		}
	};

});