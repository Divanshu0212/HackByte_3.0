import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Plant-specific data (hardcoded for this implementation)
const plantData = {
    apple: {
        name: "Apple",
        scientificName: "Malus domestica",
        image: "/assets/community/apple.jpg",
        description: "Apple trees are deciduous and generally grow to 5-12m tall. They're cultivated worldwide and are the most widely grown species in the genus Malus.",
        careInfo: "Apples require full sun, regular watering, and well-draining soil rich in organic matter.",
        commonDiseases: ["Apple scab", "Fire blight", "Cedar apple rust", "Powdery mildew"]
    },
    corn: {
        name: "Corn",
        scientificName: "Zea mays",
        image: "/assets/community/corn.jpg",
        description: "Corn is an annual grass in the Poaceae family and is a staple cereal crop grown globally, particularly in the Americas.",
        careInfo: "Corn needs full sun, consistent moisture, and nutrient-rich soil. Plant in blocks rather than rows for better pollination.",
        commonDiseases: ["Common rust", "Northern corn leaf blight", "Gray leaf spot", "Corn smut"]
    },
    rice: {
        name: "Rice",
        scientificName: "Oryza sativa",
        image: "/assets/community/rice.jpg",
        description: "Rice is the seed of the grass species Oryza sativa. As a cereal grain, it's the most widely consumed staple food for a significant part of the world's population.",
        careInfo: "Rice requires flooded fields (paddies), warm temperatures, and plenty of moisture during the growing season.",
        commonDiseases: ["Rice blast", "Bacterial leaf blight", "Sheath blight", "Tungro virus"]
    },
    wheat: {
        name: "Wheat",
        scientificName: "Triticum",
        image: "/assets/community/wheat.jpg",
        description: "Wheat is a grass widely cultivated for its seed, a cereal grain that is a worldwide staple food. It's the second most-produced cereal after maize.",
        careInfo: "Wheat requires full sun, moderate water, and well-drained, fertile soil with a neutral pH.",
        commonDiseases: ["Leaf rust", "Stem rust", "Powdery mildew", "Fusarium head blight"]
    },
    tomato: {
        name: "Tomato",
        scientificName: "Solanum lycopersicum",
        image: "/assets/community/tomato.jpg",
        description: "The tomato is the edible berry of the plant Solanum lycopersicum. Tomatoes are a significant source of umami flavor and are consumed in diverse ways.",
        careInfo: "Tomatoes need full sun, consistent watering, and well-draining soil rich in organic matter. Regular fertilization is beneficial.",
        commonDiseases: ["Early blight", "Late blight", "Septoria leaf spot", "Fusarium wilt"]
    }
};

// Mock community tips data
const initialCommunityTips = {
    apple: [
        { id: 1, user: "AppleExpert", tip: "Water deeply once a week rather than frequently and shallowly.", likes: 24, timestamp: "2 days ago" },
        { id: 2, user: "OrchardOwner", tip: "Apply mulch around the base of the tree to retain moisture and suppress weeds.", likes: 18, timestamp: "5 days ago" }
    ],
    corn: [
        { id: 1, user: "CornFarmer", tip: "Plant corn seeds 1-2 inches deep and 4-6 inches apart for best results.", likes: 15, timestamp: "1 day ago" },
        { id: 2, user: "MidwestGrower", tip: "Corn is a heavy feeder - add compost or balanced fertilizer when planting.", likes: 12, timestamp: "3 days ago" }
    ],
    rice: [
        { id: 1, user: "RiceExpert", tip: "Maintain water level at 2 inches during the vegetative stage.", likes: 20, timestamp: "4 days ago" },
        { id: 2, user: "PaddyFarmer", tip: "Drain the field 2 weeks before harvest for even ripening.", likes: 17, timestamp: "1 week ago" }
    ],
    wheat: [
        { id: 1, user: "WheatGrower", tip: "Optimal seeding depth is 1-2 inches in most soil conditions.", likes: 10, timestamp: "2 days ago" },
        { id: 2, user: "GrainFarmer", tip: "Apply nitrogen fertilizer at the tillering stage for improved yield.", likes: 14, timestamp: "6 days ago" }
    ],
    tomato: [
        { id: 1, user: "TomatoLover", tip: "Prune suckers (branches growing between stem and branches) for better airflow and fruit production.", likes: 28, timestamp: "3 days ago" },
        { id: 2, user: "GardenExpert", tip: "Water at the base rather than the leaves to prevent fungal diseases.", likes: 22, timestamp: "5 days ago" }
    ]
};

const CommunityPage = ({ defaultPlant }) => {
    const [userTip, setUserTip] = useState('');
    const [communityTips, setCommunityTips] = useState(initialCommunityTips);
    const [visibleForm, setVisibleForm] = useState(false);

    const plant = plantData[defaultPlant];

    if (!plant) {
        return <div className="max-w-6xl mx-auto px-4 py-8"><h2>Plant community not found.</h2></div>;
    }

    const handleSubmitTip = (e) => {
        e.preventDefault();
        if (!userTip.trim()) return;

        const newTip = {
            id: communityTips[defaultPlant].length + 1,
            user: "CurrentUser", // In a real app, this would be the logged-in user
            tip: userTip,
            likes: 0,
            timestamp: "Just now"
        };

        setCommunityTips({
            ...communityTips,
            [defaultPlant]: [newTip, ...communityTips[defaultPlant]]
        });

        setUserTip('');
        setVisibleForm(false);
    };

    const handleLike = (tipId) => {
        const updatedTips = communityTips[defaultPlant].map(tip =>
            tip.id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
        );

        setCommunityTips({
            ...communityTips,
            [defaultPlant]: updatedTips
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
                <div className="w-full md:w-1/3">
                    <div className="bg-gray-200 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <span className="block">Plant Image</span>
                            <span className="text-sm">(Placeholder for {plant.name})</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">{plant.name} Community</h1>
                    <p className="text-gray-600 italic mb-4">{plant.scientificName}</p>
                    <p className="mb-4">{plant.description}</p>

                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <h2 className="font-semibold text-green-800 mb-2">Basic Care Information</h2>
                        <p>{plant.careInfo}</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-green-800 mb-2">Common Diseases</h2>
                        <ul className="list-disc list-inside">
                            {plant.commonDiseases.map((disease, index) => (
                                <li key={index} className="text-gray-700">{disease}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Community Tips Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-green-800">Community Tips</h2>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                        onClick={() => setVisibleForm(!visibleForm)}
                    >
                        {visibleForm ? 'Cancel' : 'Share Your Tip'}
                    </button>
                </div>

                {/* Tip submission form */}
                {visibleForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6"
                    >
                        <form onSubmit={handleSubmitTip} className="bg-green-50 p-4 rounded-lg">
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                rows="3"
                                placeholder={`Share your tip for growing ${plant.name}...`}
                                value={userTip}
                                onChange={(e) => setUserTip(e.target.value)}
                                required
                            ></textarea>
                            <div className="mt-3 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Submit Tip
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Community tips list */}
                <div className="space-y-4">
                    {communityTips[defaultPlant]?.map((tip) => (
                        <div key={tip.id} className="border-b border-gray-200 pb-4">
                            <div className="flex justify-between">
                                <span className="font-medium">{tip.user}</span>
                                <span className="text-gray-500 text-sm">{tip.timestamp}</span>
                            </div>
                            <p className="my-2">{tip.tip}</p>
                            <button
                                className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                                onClick={() => handleLike(tip.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                                <span>{tip.likes} {tip.likes === 1 ? 'like' : 'likes'}</span>
                            </button>
                        </div>
                    ))}
                    {!communityTips[defaultPlant]?.length && <p>No tips shared yet. Be the first!</p>}
                </div>
            </div>

            {/* Navigation to other plant communities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">Explore Other Plant Communities</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.keys(plantData).map(plantKey => (
                        <Link
                            key={plantKey}
                            to={`/community/${plantKey}`}
                            className={`text-center p-3 rounded-lg transition ${
                                plantKey === defaultPlant
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 hover:bg-green-100 text-gray-800'
                            }`}
                        >
                            {plantData[plantKey].name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;