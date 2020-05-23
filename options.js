$(function () {

    chrome.storage.sync.get('synology', function (data) {
        var host = ""
        var username = ""
        var password = ""
        var protocol = "http"

        if (data.synology.host) {
            host = data.synology.host
        }
        if (data.synology.username) {
            username = data.synology.username
        }
        if (data.synology.password) {
            password = data.synology.password
        }
        if (data.synology.protocol) {
            protocol = data.synology.protocol
        }

        $("#host").val(host)
        $("#username").val(username)
        $("#password").val(password)
        $("#" + protocol).prop("checked", true);
    })

    chrome.storage.sync.get('alldebrid', function (data) {
        var apikey = ""

        if (data.alldebrid) {
            apikey = data.alldebrid
        }

        $("#apikey").val(apikey)
    })

    $('#submitSynology').click(function () {

        chrome.storage.sync.set({
            'synology': {
                host: $("#host").val(),
                username: $("#username").val(),
                password: $("#password").val(),
                protocol: $("input[name='protocol']:checked").val()
            }
        })
        let button = $('#submitSynology')
        button.removeClass("btn-light")
        button.addClass("btn-success")
    })

    $('#testSynology').click(function () {

        var host = $("#host").val()
        var username = $("#username").val()
        var password = $("#password").val()
        var protocol = $("input[name='protocol']:checked").val()

        chrome.storage.sync.set({
            'synology': {
                host: host,
                username: username,
                password: password,
                protocol: protocol
            }
        })

        var settings = {
            "url": protocol + "://" + host + "/webapi/auth.cgi?api=SYNO.API.Auth&version=2&method=login&account=" + username + "&passwd=" + password + "&session=DownloadStation&format=cookie",
            "method": "GET",
            "timeout": 0
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    })

    $('#submitAllDebrid').click(function () {

        chrome.storage.sync.set({
            'alldebrid': $("#apikey").val()
        })

        let button = $('#submitAllDebrid')
        button.removeClass("btn-light")
        button.addClass("btn-success")
    })

    $('#testAllDebird').click(function () {

        var apikey = $("#apikey").val()

        chrome.storage.sync.set({
            'alldebrid': apikey
        })

        var settings = {
            "url": "https://api.alldebrid.com/v4/user?agent=SynoDownload&apikey=" + apikey,
            "method": "GET",
            "timeout": 0
        };

        $.ajax(settings).done(function (response) {
            let button = $('#testAllDebird')
            if (response.status === "success") {
                button.removeClass("btn-danger")
                button.addClass("btn-success")
            } else {
                button.removeClass("btn-success")
                button.addClass("btn-danger")
            }
        });
    })
})