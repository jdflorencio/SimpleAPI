
module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('clientes', {
        // id:  DataTypes.INTEGER,
        // tipo: DataTypes.ENUM,        
        nome: DataTypes.STRING,
        nome_fantasia: DataTypes.STRING,
        // infor pessoas
        data_nascimento: DataTypes.DATE,
        data_fundacao: DataTypes.DATE,
        nacionalidade: DataTypes.STRING,
        estado_civil: DataTypes.STRING,
        rg: DataTypes.STRING,
        cpf_cnpj: DataTypes.STRING,
        inscricao_estadual: DataTypes.STRING,
        // endereço
        endereco : DataTypes.STRING,
        bairro : DataTypes.STRING,
        numero : DataTypes.STRING,
        complemento : DataTypes.STRING,
        cidade : DataTypes.STRING,
        uf : DataTypes.STRING,
        //  contato
        email : DataTypes.STRING,
        telefone : DataTypes.STRING,
        celular : DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updateAt: DataTypes.DATE        
    });
    return Clientes;
}
