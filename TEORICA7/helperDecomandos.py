db.contratos.aggregate([
    {
        $group: {
            _id: "$entidade_comunicante",
            totalMontante: { $sum: "$precoContratual" }
        }
    },
    { $sort: { totalMontante: -1 } } // Ordena do maior para o menor
]).forEach(function(doc) {
    print("Entidade: " + doc._id + ", Montante Global: " + doc.totalMontante);
});
