const { emprunt } = require('../models');

// Créer un emprunt
exports.create = async (req, res) => {
  try {
    const { dateEmprunt, dateRetourR, dateRetourE } = req.body;

    const newEmprunt = await emprunt.create({
      dateEmprunt,
      dateRetourR,
      dateRetourE,
    });

    res.status(201).json(newEmprunt); // Renvoie l'emprunt créé
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'emprunt' });
  }
};


// Récupérer tous les emprunts
exports.findAll = async (req, res) => {
  try {
    const emprunts = await emprunt.findAll(); // Récupérer tous les emprunts
    res.status(200).json(emprunts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des emprunts' });
  }
};

// Récupérer un emprunt par ID
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const empruntData = await emprunt.findOne({ where: { id } });

    if (!empruntData) {
      return res.status(404).json({ message: 'Emprunt non trouvé' });
    }

    res.status(200).json(empruntData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'emprunt' });
  }
};

// Mettre à jour un emprunt
exports.update = async (req, res) => {
  const { id } = req.params;
  const { dateRetourR, dateRetourE } = req.body;

  try {
    const empruntData = await emprunt.findOne({ where: { id } });

    if (!empruntData) {
      return res.status(404).json({ message: 'Emprunt non trouvé' });
    }

    // Mettre à jour les dates de retour
    empruntData.dateRetourR = dateRetourR || empruntData.dateRetourR;
    empruntData.dateRetourE = dateRetourE || empruntData.dateRetourE;

    await empruntData.save();

    res.status(200).json(empruntData); // Retourner les données mises à jour
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'emprunt' });
  }
};

// Supprimer un emprunt
exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const empruntData = await emprunt.findOne({ where: { id } });

    if (!empruntData) {
      return res.status(404).json({ message: 'Emprunt non trouvé' });
    }

    // Supprimer l'emprunt
    await empruntData.destroy();

    res.status(200).json({ message: 'Emprunt supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'emprunt' });
  }
};
