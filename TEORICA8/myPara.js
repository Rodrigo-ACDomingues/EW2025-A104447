$(function(){
    var paraCount = 0;
    // Carregar os parágrafos existentes na BD
    $.get('http://localhost:3000/paras', function(plist) {
        paraCount = plist.length;
        plist.forEach(p => {
            $("#paraList").append(
                `<li p_id="${p.id}">
                    <b>${p.date}</b>: ${p.p}
                    <button class="w3.button w3-red w3-small removeB"> Delete </button>
                </li>`
            )
        });
    })

    // Adicionar novo parágrafo
    $("#addPara").click(function(){
        let text = $("#paraText").val()
        var ndate = new Date();
        let date = ndate.toISOString().substring(0,19)
        let newpara = {
            p: text,
            date : date,
            id : "p" + paraCount
        }

        $.post({
            url: "http://localhost:3000/paras",
            data: JSON.stringify(newpara),
            headers: {'Content-Type': 'application/json'},
            dataType: 'json',
            sucess: function(response) {
                alert('Registo inserido na BD: ' + JSON.stringify(response))
                $("#paraList").append(
                    `<li p_id="${newpara.id}">
                        <b>${newpara.date}</b>: ${newpara.p}
                        <button class="w3.button w3-red w3-small removeB"> Delete </button>
                    </li>`
                )
                paraCount++;
                $("#paraText").val("")
            },
            error: function(error) {
                alert('Ocorreu um erro: ' + JSON.stringify(error))
            }
        })
    })

    // Apagar o parágrafo ao clickar no botão
    $("#paraList").on("click", ".removeB", function() {
        let li = $(this).parent()
        let paraId = li.attr("p_id")

        $.ajax({
            url: `http://localhost:3000/paras/${paraId}`,
            type: "DELETE",
            sucess: function(){
                li.remove()
            },
            error: function(error){
                alert('Ocorreu um erro: ' + JSON.stringify(error))
            }
        })

    })

})