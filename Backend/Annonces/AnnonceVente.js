var db = require('../config/db');

var AnnonceVente = {
    getAnnonceVente: function(callback){
        var sql = "CALL getListeAnnonceVentes()";
        console.log("requete " + sql + " Envoyée !!!");
        return db.query(sql, [], callback);
    },

    createAnnonceVente: function(immatriculation, annonceVente, callback){
        datePublication = new Date();
        libelleAnnonceVente = annonceVente.libelleAnnonceVente;
        descriptifAnnonceVente = annonceVente.descriptifAnnonceVente ;
        prixVente = annonceVente.prixVente ;
        photo = annonceVente.photo ;
        kilometrage = annonceVente.kilometrage;
        var sql = "select createAnnonceVente(?,?,?,?,?,?,?)";
        console.log("requete " + sql + " Envoyée !!!");
        return db.query(sql, [immatriculation, datePublication, libelleAnnonceVente, descriptifAnnonceVente,
        prixVente, photo, kilometrage], callback);
    }
}

module.exports = AnnonceVente;