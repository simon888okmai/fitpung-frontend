import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getMyShoes, setDefaultShoe, addShoe, retireShoe } from '../../../services/shoeService';

const MyShoeScreen = () => {
    const navigation = useNavigation();
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newShoe, setNewShoe] = useState({
        brand: '',
        model: '',
        name: '',
        maxDistance: ''
    });

    useEffect(() => {
        loadShoes();
    }, []);

    const loadShoes = async () => {
        setLoading(true);
        const data = await getMyShoes();
        setShoes(data);
        setLoading(false);
    };

    const handleSetDefault = async (shoe) => {
        if (shoe.isDefault) return;

        const oldState = [...shoes];
        setShoes(shoes.map(s => ({ ...s, isDefault: s.id === shoe.id })));

        const success = await setDefaultShoe(shoe.id);
        if (!success) {
            Alert.alert("Error", "Could not set default shoe. Please try again.");
            setShoes(oldState); // Revert
        }
    };

    const handleRetire = (shoe) => {
        Alert.alert(
            "Retire Shoe",
            `Are you sure you want to retire ${shoe.name || shoe.brand}? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Retire",
                    style: "destructive",
                    onPress: async () => {
                        const success = await retireShoe(shoe.id);
                        if (success) {
                            loadShoes(); // Refresh list to remove the retired shoe
                        } else {
                            Alert.alert("Error", "Failed to retire shoe.");
                        }
                    }
                }
            ]
        );
    };

    const handleAddNewShoe = async () => {
        if (!newShoe.brand || !newShoe.model) {
            Alert.alert("Required Fields", "Please enter at least the Brand and Model.");
            return;
        }

        setIsSubmitting(true);
        const payload = {
            ...newShoe,
            maxDistance: newShoe.maxDistance ? Number(newShoe.maxDistance) : 800,
            isDefault: shoes.length === 0 // Make default if it's the first shoe
        };

        const result = await addShoe(payload);
        setIsSubmitting(false);

        if (result.success) {
            setIsAddModalVisible(false);
            setNewShoe({ brand: '', model: '', name: '', maxDistance: '' });
            loadShoes(); // Refresh list
        } else {
            Alert.alert("Error", "Could not add the shoe. Please try again.");
        }
    };

    const renderShoeCard = ({ item }) => {
        const percentage = Math.min((item.currentDistance / item.maxDistance) * 100, 100) || 0;
        const isDefault = item.isDefault;

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => !isDefault && handleSetDefault(item)}
                className={`relative rounded-[16px] p-[16px] mb-[12px] border-[1px] ${isDefault ? 'border-primary bg-[#1C1C1E]' : 'border-[#333] bg-[#141414]'}`}
            >
                {/* Trash Icon at Top Right */}
                <TouchableOpacity
                    className="absolute top-[16px] right-[16px] z-10 p-[6px] bg-[#FF4444]/15 rounded-full"
                    onPress={() => handleRetire(item)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="trash-outline" size={18} color="#FF4444" />
                </TouchableOpacity>

                {/* Header Information */}
                <View className="pr-[40px] mb-[12px]">
                    <View className="flex-row items-center gap-x-[6px] mb-[8px]">
                        <MaterialCommunityIcons name="shoe-sneaker" size={20} color={isDefault ? "#B1FC30" : "#A1A1A1"} />
                        <Text className={`text-[14px] font-line-xbold uppercase ${isDefault ? 'text-primary' : 'text-[#A1A1A1]'}`}>{item.brand}</Text>

                        {isDefault && (
                            <View className="bg-primary/20 px-[8px] py-[3px] rounded-[10px] ml-[4px]">
                                <Text className="text-primary text-[10px] font-line-bold">ACTIVE</Text>
                            </View>
                        )}
                    </View>

                    <Text className="text-[20px] font-line-bold text-white mb-[2px]">
                        {item.name || item.model}
                    </Text>
                    {item.name && item.model && (
                        <Text className="text-[13px] font-line-regular text-[#888]">{item.model}</Text>
                    )}
                </View>

                {/* Mileage Bar */}
                <View className="mt-[4px]">
                    <View className="flex-row justify-between mb-[6px]">
                        <Text className="text-[13px] font-line-regular text-[#A1A1A1]">Mileage</Text>
                        <Text className="text-[13px] font-line-bold text-white">
                            {parseFloat(item.currentDistance || 0).toFixed(1)} <Text className="text-[#888] font-line-regular">/ {item.maxDistance} km</Text>
                        </Text>
                    </View>
                    <View className="h-[6px] rounded-[3px] overflow-hidden bg-[#333]">
                        <View className="h-full rounded-[3px] bg-primary" style={{ width: `${percentage}%` }} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-[#141414] pt-12">
            {/* Header */}
            <View className="flex-row items-center justify-between px-[20px] py-[15px]">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-[5px] bg-[#2C2C2E] rounded-[20px]">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-primary text-[28px] font-line-bold">My Shoe</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* List */}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#B1FC30" />
                </View>
            ) : (
                <FlatList
                    data={shoes}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderShoeCard}
                    contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                    ListEmptyComponent={
                        <View className="items-center justify-center mt-[100px]">
                            <MaterialCommunityIcons name="run" size={80} color="#333" />
                            <Text className="text-white text-[20px] font-line-bold mt-[15px] text-center">You haven't added any shoes yet!</Text>
                            <Text className="text-[#888] text-[16px] font-line-regular text-center mt-[10px] px-[30px] leading-[22px]">Track your shoe's mileage to know exactly when it's time to replace them to avoid injuries.</Text>
                        </View>
                    }
                />
            )}

            {/* Floating Action Button */}
            <TouchableOpacity
                className="absolute bottom-[30px] right-[20px] bg-primary flex-row items-center px-[22px] py-[16px] rounded-[30px] shadow-lg shadow-primary/30"
                onPress={() => setIsAddModalVisible(true)}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={28} color="black" />
                <Text className="text-black font-line-bold text-[18px] ml-[8px]">Add Shoe</Text>
            </TouchableOpacity>

            {/* Add Shoe Modal */}
            <Modal visible={isAddModalVisible} animationType="slide" transparent={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-black/80 justify-end">
                        <View className="bg-[#1C1C1E] rounded-t-[30px] p-[25px] min-h-[60%]">
                            <View className="flex-row justify-between items-center mb-[25px]">
                                <Text className="text-white text-[26px] font-line-bold">Add New Shoe</Text>
                                <TouchableOpacity onPress={() => setIsAddModalVisible(false)} className="bg-white/10 rounded-full p-[4px]">
                                    <Ionicons name="close" size={28} color="white" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View className="mb-[20px]">
                                    <Text className="text-[#A1A1A1] text-[16px] mb-[8px] font-line-bold">Brand (e.g., Nike)*</Text>
                                    <TextInput
                                        className="bg-[#2C2C2E] text-white px-[18px] py-[16px] rounded-[16px] text-[18px] border-[1px] border-[#333] font-line-regular"
                                        placeholder="Nike, Hoka, Asics..."
                                        placeholderTextColor="#666"
                                        value={newShoe.brand}
                                        onChangeText={val => setNewShoe({ ...newShoe, brand: val })}
                                    />
                                </View>

                                <View className="mb-[20px]">
                                    <Text className="text-[#A1A1A1] text-[16px] mb-[8px] font-line-bold">Model (e.g., Alphafly 3)*</Text>
                                    <TextInput
                                        className="bg-[#2C2C2E] text-white px-[18px] py-[16px] rounded-[16px] text-[18px] border-[1px] border-[#333] font-line-regular"
                                        placeholder="Specific model name"
                                        placeholderTextColor="#666"
                                        value={newShoe.model}
                                        onChangeText={val => setNewShoe({ ...newShoe, model: val })}
                                    />
                                </View>

                                <View className="mb-[20px]">
                                    <Text className="text-[#A1A1A1] text-[16px] mb-[8px] font-line-bold">Nickname (Optional)</Text>
                                    <TextInput
                                        className="bg-[#2C2C2E] text-white px-[18px] py-[16px] rounded-[16px] text-[18px] border-[1px] border-[#333] font-line-regular"
                                        placeholder="e.g., Race Day Rockets"
                                        placeholderTextColor="#666"
                                        value={newShoe.name}
                                        onChangeText={val => setNewShoe({ ...newShoe, name: val })}
                                    />
                                </View>

                                <View className="mb-[20px]">
                                    <Text className="text-[#A1A1A1] text-[16px] mb-[8px] font-line-bold">Lifespan / Max Distance (km)</Text>
                                    <TextInput
                                        className="bg-[#2C2C2E] text-white px-[18px] py-[16px] rounded-[16px] text-[18px] border-[1px] border-[#333] font-line-regular"
                                        placeholder="Default is 800km"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                        value={newShoe.maxDistance}
                                        onChangeText={val => setNewShoe({ ...newShoe, maxDistance: val })}
                                    />
                                </View>

                                <TouchableOpacity
                                    className={`bg-primary py-[18px] rounded-[20px] items-center mt-[10px] mb-[40px] shadow-lg shadow-primary/20 ${isSubmitting ? 'opacity-70' : ''}`}
                                    onPress={handleAddNewShoe}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator size="small" color="black" />
                                    ) : (
                                        <Text className="text-black text-[20px] font-line-bold">Save Shoe</Text>
                                    )}
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};

export default MyShoeScreen;
