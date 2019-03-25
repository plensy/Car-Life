var db = require('../config/db');

var Car = {
    getCarByMail: function (email, statut, callback) {
        var sql;
        if(statut === 'Particulier'){
            sql = "call getListeVehiculeProprietaire(?)" ;
        }else {
            sql = " ";
        }
        console.log("requete " + sql + " Envoyée !!!");
        return db.query(sql,[email],callback);       
    },

    getInterventions: function(immatriculation, callback){
        var sql = "CALL getListeInterventions(?)";
        console.log("requete " + sql + " Envoyée !!!");
        return db.query(sql,[immatriculation],callback);  
    },

    getVehicule: function(immatriculation, callback){
       var sql = "CALL getVehicule(?)" ;
       console.log("requete " + sql + " Envoyée !!! ");
       return db.query(sql, [immatriculation], callback);
    },

    createPanneByUser: function(idTypePanne, idVehicule,callback){
        var sql = "select createPanne(?,?,?)";
        console.log("requete " + sql + " Envoyée !!! ");
        return db.query(sql, [null, idTypePanne, idVehicule], callback);
    },

    createIntervention : function(idGarage, idPanne, intervention, callback){
        libelleIntervetion = intervention.libelleIntervetion ;
        justificatifIntervention = intervention.justificatifIntervention ;
        dateDebutIntervention = intervention.dateDebutIntervention ;
        dateFinIntervention = intervention.dateFinIntervention ;
        var sql = "select createInterventionIdGarage(?,?,?,?,?,?)" ;
        console.log("requete " + sql + " Envoyée !!!");
        return db.query(sql, [idGarage, idPanne, libelleIntervention, justificatifIntervention, 
            dateDebutIntervention, dateFinIntervention
         ], callback);
    },

    createCar: function(email, voiture, callback){
        immatriculation = voiture.immatriculation ; 
        libelleVoiture = voiture.libelleVoiture ; 
        marqueVoiture = voiture.marqueVoiture ; 
        modeleVoiture = voiture.modeleVoiture ; 
        anneeCirculation = voiture.anneeCirculation ; 
        finition = voiture.finition ;					
         justificatif = voiture.justificatif ; 
         photo = voiture.photo ;
         carburant = voiture.carburant ;
         boiteVitesse = voiture.boiteVitesse ; 
         moteur_type = voiture.moteur_type ;
         moteur_cylindree = voiture.moteur_cylindree ; 
         moteur_emissionC02 = voiture.moteur_emissionC02 ; 
         transmission_type = voiture.transmission_type ;
        transmission_nbRapports = voiture.transmission_nbRapports ; 
          transmission_pneumatique = voiture.transmission_pneumatique ; 
          mesures_0a100 = voiture.mesures_0a100 ;
          mesures_masseAVide = voiture.mesures_masseAVide ;
           mesures_capaciteNomCoffre = voiture.mesures_capaciteNomCoffre ; 
           mesures_capaciteMaxCoffre = voiture.mesures_capaciteMaxCoffre ;
           consommation_urbaine = voiture.consommation_urbaine ;
           consommation_extraUrbaine = voiture.consommation_extraUrbaine ; 
           statut = voiture.statut ;
           visibilite = voiture.visibilite ; 
           isActive = voiture.isActive ;
        var sql = "select createVehiculeProprietaire(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        console.log("requete " + sql + " Envoyée !!!");
        return db.query(sql,[email, immatriculation, libelleVoiture, marqueVoiture, modeleVoiture, anneeCirculation, finition,					
            justificatif, photo, carburant, boiteVitesse, moteur_type, moteur_cylindree, moteur_emissionC02, 
            transmission_type, transmission_nbRapports, transmission_pneumatique, mesures_0a100, mesures_masseAVide,
            mesures_capaciteNomCoffre, mesures_capaciteMaxCoffre, consommation_urbaine,	consommation_extraUrbaine, 
            statut, visibilite, isActive],callback);
    },

    transfertCar : function(idAcheteur, idReceveur, idVehicule, dateAcquisition, callback){
        var sql = "select cessionVehicule(?,?,?,?)" ;
        console.log("vente de " + idAcheteur + " vers "+ idReceveur + " du vehicule "+ idVehicule);
       console.log("requete " + sql + " Envoyée !!! ");
       return db.query(sql, [idAcheteur, idReceveur, idVehicule, dateAcquisition], callback);
    }
    
};

module.exports = Car;