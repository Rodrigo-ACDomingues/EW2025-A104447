export function genMainPage(data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-red">
                    <h1>Consultas</h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-red">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunosPage(lreps, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Página Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-red">
                    <h1>Lista de Alunos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>Curso</th>
                            <th>Ano</th>
                            <th>Instrumento</th>
                        </tr>`
    lreps.forEach(rep => {
        pagHTML += `
        <tr>
            <td>${rep.id}</td>
            <td>${rep.nome}</td>
            <td>${rep.dataNasc}</td>
            <td>${rep.curso}</td>
            <td>${rep.anoCurso}</td>
            <td>${rep.instrumento}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-red">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursosPage(lreps, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Página Cursos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-red">
                    <h1>Lista de Cursos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Designacao</th>
                            <th>Duracao</th>
                            <th>Instrumento ID</th>
                            <th>Instumento Nome</th>
                        </tr>`
    lreps.forEach(rep => {
        pagHTML += `
        <tr>
            <td>${rep.id}</td>
            <td>${rep.designacao}</td>
            <td>${rep.duracao}</td>
            <td>${rep.instrumento.id}</td>
            <td>${rep.instrumento["#text"]}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-red">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentosPage(lreps, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Página Instrumentos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-red">
                    <h1>Lista de Instrumentos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Instrumento ID</th>
                            <th>Instumento Nome</th>
                        </tr>`
    lreps.forEach(rep => {
        pagHTML += `
        <tr>
            <td>${rep.id}</td>
            <td>${rep["#text"]}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-red">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}
