$(function () {
  // 点击“去注册账号”的链接
  $('#link_login').on('click', function () {
    $('.linkLogin').hide()
    $(".linkRe").show()

  })
  // 点击"登录"的链接
  $("#link_re").on("click", function () {
    $(".linkRe").hide()
    $('.linkLogin').show()
  })

  // layui 中获取form对象
  // let form = layui.form
  //通过form.verify()函数自定义效验规则
  // form.verify({
  //   psw: [/^[/S]{6,12}$/, '密码必须6-12位且不包含空格']
  // })


  const regUserName = /^[a-zA-Z]{6,12}$/
  const regPassword = /^[\w\s]{6,12}$/

  let btnlogin = document.querySelector(".btn")

  let userVla = document.querySelector(".user")
  let pswVla = document.querySelector(".psw")
  // let pswdVla = document.querySelector(".pswd")

  let aaa = document.querySelector("#aaa")
  let bbb = document.querySelector("#bbb")
  let ccc = document.querySelector("#ccc")

  //判断表单值是否为空
  function inputRed(ele, val) {
    ele.addEventListener("click", function () {


      if (val.value.length <= 0) {

        val.style.border = " 1px solid red"

      } else {
        val.style.border = "1px solid #ccc"
      }
    })
  }

  //正则表达式
  function re(element, reg, layout) {
    element.addEventListener("blur", function () {

      if (reg.test(this.value)) {
        // $(this).next().html("格式正确")
        layui.use('layer', function () {
          var layer = layui.layer;

          layer.msg('格式正确✔', { icon: 6, time: 1500 });
        });

      } else {
        // $(this).next().html(layout)
        layui.use('layer', function () {
          var layer = layui.layer;
          layer.msg(layout, { icon: 5, time: 1500 });
        });
      }


    })


  }


  // 登录验证
  re(userVla, regUserName, "请输入6-12位英文字母❌")
  re(pswVla, regPassword, "密码必须6-12位且不包含空格❌")
  // 调用是否为空的函数
  inputRed(btnlogin, userVla)
  inputRed(btnlogin, pswVla)
  // 注册验证
  re(aaa, regUserName, "请输入6-12位英文字母❌")
  re(bbb, regPassword, "密码必须6-12位且不包含空格❌")


  // 验证两次密码是否一致
  ccc.addEventListener("blur", function () {

    if (bbb.value.length <= 0) {
      return
    }
    if (bbb.value === ccc.value) {

      layui.use('layer', function () {
        var layer = layui.layer;

        layer.msg('输入正确✔', { icon: 6, time: 1500 });
      });
    } else {
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg("两次密码不一致", { icon: 5, time: 1500 });
      });
    }

  })

  // 监听注册表单提交事件
  $(".linkRe").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: { username: $("#aaa").val(), password: $("#bbb").val() },
      success: function (res) {
        if (res.status !== 0) {
          layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg(res.message, { time: 1500 });
          });
          return
        }
        layui.use('layer', function () {
          var layer = layui.layer;
          layer.msg(res.message, { time: 1500 });
          $("#link_re").click()
        });
      }
    })
  })
  // 监听登录表单提交事件
  $(".linkLogin").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/api/login",
      data: { username: $(".user").val(), password: $(".psw").val() },
      success: function (res) {
        if (res.status !== 0) {
          layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg(res.message, { time: 1500 });
          });
          return
        }

        // 吧token值存到本地存储中
        localStorage.setItem("token", res.token)
        // location.href="http://wwww.baidu.com"
      }
    })
  }) 
})


