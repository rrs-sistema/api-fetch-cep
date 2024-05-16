const localStorage = window.localStorage;
let cepArray = localStorage.getItem('cepList') ? JSON.parse(localStorage.getItem('cepList')) : [];
localStorage.setItem('cepList', JSON.stringify(cepArray));

window.onload = function () {
    listarEnderecos();
    mostrarOcultarBotaoGravar(false);
};

function listarEnderecos() {
    const parent = document.getElementById("table");
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    // Cria o cabeçalho da tabela
    criaCabecalhoTable();
    const dadosLocalStorage = JSON.parse(localStorage.getItem('cepList'));
    cepArray = [];
    let index = 0;
    dadosLocalStorage.forEach(item => {
        item.id = index;
        cepArray.push(item);
        criarElemento(item);
        index++;
    });
    var linhasTabela = document.getElementsByTagName("tr");
    for (var i = 0; i < linhasTabela.length; i++) {
        if (i == 0) {
            continue;
        }
        else if ((i) % 2 == 0) {
            linhasTabela[i].className = "styleOne";
        }
        else {
            linhasTabela[i].className = "styleTwo";
        }
    }

    localStorage.setItem('cepList', JSON.stringify(cepArray));
}

function criaCabecalhoTable() {
    var row = document.createElement("tr");
    row.style = 'background-color: #0F2028; color: #FFFFFF';

    var thCEP = document.createElement("th");
    thCEP.innerHTML = 'CEP';
    thCEP.style = 'min-width: 90px; width: 110px; text-align: center;';
    row.append(thCEP);

    var thEndereco = document.createElement("th");
    thEndereco.innerHTML = 'Logradouro';
    thEndereco.style = 'width: 40%; text-align: left;';
    row.append(thEndereco);

    var thBairro = document.createElement("th");
    thBairro.innerHTML = 'Bairro';
    thBairro.style = 'width: 30%; text-align: left;';
    row.append(thBairro);

    var thCidade = document.createElement("th");
    thCidade.innerHTML = 'Cidade';
    thCidade.style = 'width: 20%; text-align: left;';
    row.append(thCidade);

    var thUF = document.createElement("th");
    thUF.innerHTML = 'UF';
    thUF.style = 'min-width: 90px; width: 100px; text-align: center;';
    row.append(thUF);

    var thIBGE = document.createElement("th");
    thIBGE.innerHTML = 'IBGE';
    thIBGE.style = 'min-width: 90px; width: 110px; text-align: center;';
    row.append(thIBGE);

    var thActions = document.createElement("th");
    thActions.innerHTML = 'Ações';
    thActions.colSpan = 3;
    thActions.style = 'min-width: 90px; text-align: center;';
    row.append(thActions);

    const table = document.getElementById("table");
    table.insertBefore(row, table.childNodes[0]);// Adiciona a linha na posição zero(0) tabela
}

function criarElemento(modelo) {
    const id = modelo.id;
    var cellTextothCEP = document.createElement("td");
    cellTextothCEP.id = id;
    cellTextothCEP.cep = modelo.cep;
    cellTextothCEP.innerHTML = modelo.cep;
    cellTextothCEP.style = 'text-align: center;';

    var cellTextoLogradouro = document.createElement("td");
    cellTextoLogradouro.id = id;
    cellTextoLogradouro.innerHTML = modelo.logradouro;

    var cellTextoCidade = document.createElement("td");
    cellTextoCidade.id = id;
    cellTextoCidade.innerHTML = modelo.localidade;

    var cellTextoUF = document.createElement("td");
    cellTextoUF.id = id;
    cellTextoUF.innerHTML = modelo.uf;

    var cellTextoIbge = document.createElement("td");
    cellTextoIbge.id = id;
    cellTextoIbge.innerHTML = modelo.ibge;

    var cellTextoBairro = document.createElement("td");
    cellTextoBairro.id = id;
    cellTextoBairro.innerHTML = modelo.bairro;

    var cellDeletar = document.createElement("td");
    const rowId = `row_id_${modelo.id}`;

    cellDeletar.appendChild(criaButtonGeneric('Deletar', 'btn_deletar', `deletar('${rowId}')`));
    cellDeletar.style = 'text-align: center;';

    var row = document.createElement("tr");
    row.id = rowId;
    row.appendChild(cellTextothCEP);
    cellTextothCEP.style = 'color: black; text-align: center;';

    row.appendChild(cellTextoLogradouro);
    cellTextoLogradouro.style = 'color: black;';

    row.appendChild(cellTextoBairro);
    cellTextoBairro.style = 'color: black;';

    row.appendChild(cellTextoCidade);
    cellTextoCidade.style = 'color: black;';

    row.appendChild(cellTextoUF);
    cellTextoUF.style = 'color: black;';
    cellTextoUF.style = 'text-align: center;';

    row.appendChild(cellTextoIbge);
    cellTextoIbge.style = 'color: black;';
    cellTextoIbge.style = 'text-align: center;';

    row.appendChild(cellDeletar);
    const table = document.getElementById("table");

    table.appendChild(row);// Adiciona a linha na tabela
    limpaCampos();
}

function criaButtonGeneric(nome, className, funcao) {
    var button = document.createElement('input');
    button.id = `button${nome}`;//"buttonEditar";
    button.name = `button${nome}`;//"buttonEditar";
    button.type = "button";
    button.value = nome;
    button.className = `btn_generic ${className}`;
    button.setAttribute('onclick', funcao);
    return button;
}

class EnderecoModel {
    constructor(id, cep, logradouro, complemento, bairro, localidade, uf, ibge) {
        this.id = id;
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
        this.ibge = ibge;
    }
}

function cepMascara(cep) {
    if (cep.value.length == 5) {
        cep.value = cep.value + '-'
    }
}

function limpaCampos() {
    const inputCepConsulta = document.getElementById('inputCepConsulta');
    inputCepConsulta.value = '';

    const inputCep = document.getElementById('inputCep');
    inputCep.value = '';
    const inputLogradouro = document.getElementById('inputLogradouro');
    inputLogradouro.value = '';
    const inputBairro = document.getElementById('inputBairro');
    inputBairro.value = '';
    const inputCidade = document.getElementById('inputCidade');
    inputCidade.value = '';
    const inputUF = document.getElementById('inputUF');
    inputUF.value = '';
    const inputIBGE = document.getElementById('inputIBGE');
    inputIBGE.value = '';

    document.getElementById("inputCepConsulta").focus();
}

function apiFetch() {
    const cep = document.getElementById('inputCepConsulta');
    if (cep.value === undefined || cep.value === '') {
        showAlertModal('Por favor informe um CEP.')
        return;
    }

    if (cep.value.length < 7) {
        showAlertModal('Por favor informe um CEP válido.')
        return;
    }
    const cepFormatado = cep.value.replace('-', '');

    console.log(`CEP Informado ===>> ${cepFormatado}`);
    showModalLoading();
    setTimeout(function () {
        fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)
            .then(res => res.json())
            .then(json => {
                const inputCep = document.getElementById('inputCep');
                inputCep.value = json.cep;
                const inputLogradouro = document.getElementById('inputLogradouro');
                inputLogradouro.value = json.logradouro;
                const inputBairro = document.getElementById('inputBairro');
                inputBairro.value = json.bairro;
                const inputCidade = document.getElementById('inputCidade');
                inputCidade.value = json.localidade;
                const inputUF = document.getElementById('inputUF');
                inputUF.value = json.uf;
                const inputIBGE = document.getElementById('inputIBGE');
                inputIBGE.value = json.ibge;
                mostrarOcultarBotaoGravar(true);
            })
            .catch(error => {
                mostrarOcultarBotaoGravar(false);
                showAlertModal(error);
            })
            .finally(_ => closeModalLoading())
    }, 2.0 * 1000);

    limpaCampos();
}

function gravarInformacao() {
    var modalPergunta = document.getElementById('modalPergunta');
    var tituloAlerta = document.getElementById('tituloModalPergunta');
    var mensagemAlerta = document.getElementById('mensagemModalPergunta');
    tituloAlerta.innerHTML = 'Pergunta!';
    mensagemAlerta.innerHTML = `Deseja gravar essa informações?`;
    var buttonSimModalPergunta = document.getElementById('simModalPergunta');
    buttonSimModalPergunta.setAttribute('onclick', 'efetuaGravacao()');
    modalPergunta.showModal();
}

function efetuaGravacao() {
    const inputCep = document.getElementById('inputCep').value;
    const inputLogradouro = document.getElementById('inputLogradouro').value;
    const inputBairro = document.getElementById('inputBairro').value;
    const inputCidade = document.getElementById('inputCidade').value;
    const inputUF = document.getElementById('inputUF').value;
    const inputIBGE = document.getElementById('inputIBGE').value;

    let objExiste = cepArray.find(o => o.cep.trim() === inputCep.trim() &&
        o.logradouro.trim() === inputLogradouro.trim() &&
        o.bairro.trim() === inputBairro.trim() &&
        o.localidade.trim() === inputCidade.trim());
    if (objExiste != null && objExiste != undefined) {
        cepArray.splice(objExiste.id, 1);
    }

    let model = new EnderecoModel();
    model.id = ((cepArray === undefined || cepArray === null || cepArray.length === 0) ? 0 : (cepArray.length + 1));
    model.cep = inputCep.trim();
    model.logradouro = inputLogradouro.trim();
    model.bairro = inputBairro.trim();
    model.localidade = inputCidade.trim();
    model.uf = inputUF.trim();
    model.ibge = inputIBGE.trim();
    cepArray.push(model);
    localStorage.setItem('cepList', JSON.stringify(cepArray));
    listarEnderecos();
    var modalPergunta = document.getElementById('modalPergunta');
    modalPergunta.close();
    mostrarOcultarBotaoGravar(false);
    limpaCampos();
}

function deletar(rowId) {
    const id = rowId.replace("row_id_", '');
    let objEndereco = cepArray.find(o => o.id === parseInt(id));
    var modalPergunta = document.getElementById('modalPergunta');
    var tituloAlerta = document.getElementById('tituloModalPergunta');
    var mensagemAlerta = document.getElementById('mensagemModalPergunta');

    tituloAlerta.innerHTML = 'Pergunta!';

    mensagemAlerta.innerHTML = `Deseja excluir essa informação do CEP: "${objEndereco.cep}"?`;
    var buttonSimModalPergunta = document.getElementById('simModalPergunta');
    buttonSimModalPergunta.setAttribute('onclick', `efetuaExclusao('${rowId}', ${objEndereco.cep})`);

    modalPergunta.showModal();
}

function efetuaExclusao(rowId, idAluno) {
    var row = document.getElementById(rowId);
    const id = rowId.replace("row_id_", '');
    row.parentNode.removeChild(row);
    cepArray.splice(id, 1);
    localStorage.setItem('cepList', JSON.stringify(cepArray));

    var modal = document.getElementById('modalPergunta');
    modal.close();

    listarEnderecos();
}

function showModalLoading() {
    var modalLoading = document.getElementById('modalLoading');
    modalLoading.showModal();
}

function closeModalLoading() {
    var modalLoading = document.getElementById('modalLoading');
    modalLoading.close();
}

function showAlertModal(mensagem) {
    var modalAlerta = document.getElementById('modalAlerta');
    var tituloAlerta = document.getElementById('tituloAlerta');
    var mensagemAlerta = document.getElementById('mensagemAlerta');

    tituloAlerta.innerHTML = 'Atenção!';
    mensagemAlerta.innerHTML = mensagem;
    modalAlerta.showModal();
    return;
}

function closeModalAlerta() {
    var modal = document.getElementById('modalAlerta');
    modal.close();
}

function closeModalPergunta() {
    var modal = document.getElementById('modalPergunta');
    modal.close();
}

function mostrarOcultarBotaoGravar(mostrar) {
    const btnCancelar = document.getElementById("btn_gravar");
    btnCancelar.style = mostrar ? "display: null;" : "display: none;"
}