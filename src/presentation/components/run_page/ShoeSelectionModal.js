import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getMyShoes, setDefaultShoe } from '../../../services/shoeService';

const ShoeSelectionModal = ({ visible, onClose, onSelectShoe }) => {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (visible) {
            fetchShoes();
        }
    }, [visible]);

    const fetchShoes = async () => {
        setLoading(true);
        const data = await getMyShoes();
        setShoes(data);
        setLoading(false);
    };

    const handleSelect = async (shoe) => {

        if (shoes && Array.isArray(shoes)) {
            setShoes(shoes.map(s => ({
                ...s,
                isDefault: s.id === shoe.id
            })));
        }

        await setDefaultShoe(shoe.id);

        if (onSelectShoe) {
            onSelectShoe(shoe);
        }

        setTimeout(() => {
            onClose();
        }, 300);
    };

    const renderShoe = ({ item }) => {
        const isActive = item.isDefault;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                className={`flex-row items-center p-[14px] rounded-[16px] mb-[12px] border-[1px] ${isActive ? 'bg-[#1C1C1E] border-primary' : 'bg-[#141414] border-[#333]'}`}
                onPress={() => handleSelect(item)}
            >
                <View className="mr-[14px] bg-black/20 p-[8px] rounded-[12px]">
                    <MaterialCommunityIcons
                        name="shoe-sneaker"
                        size={28}
                        color={isActive ? "#B1FC30" : "#A1A1A1"}
                    />
                </View>
                <View className="flex-1">
                    <Text className={`text-[16px] font-line-bold mb-[2px] text-white`}>
                        {item.name || `${item.brand} ${item.model}`}
                    </Text>
                    <Text className={`text-[13px] font-line-regular ${isActive ? 'text-primary' : 'text-[#888]'}`}>
                        Mileage: {item.currentDistance || 0} / {item.maxDistance || 800} km
                    </Text>
                </View>
                {isActive && (
                    <Ionicons name="checkmark-circle" size={24} color="#B1FC30" />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/70 justify-end">
                <View className="bg-[#1C1C1E] rounded-t-[32px] min-h-[40%] max-h-[80%] px-[25px] pt-[25px]">
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-[25px]">
                        <Text className="text-[26px] font-line-bold text-white">Select Your Gear</Text>
                        <TouchableOpacity onPress={onClose} className="bg-white/10 rounded-full p-[6px]">
                            <Ionicons name="close" size={26} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#B1FC30" className="mt-[50px] mb-[50px]" />
                    ) : shoes.length === 0 ? (
                        <View className="items-center py-[50px]">
                            <MaterialCommunityIcons name="shoe-cleat" size={72} color="#3A3A3C" />
                            <Text className="text-white text-[20px] font-line-bold mt-[15px]">No shoes found.</Text>
                            <Text className="text-[#A1A1A1] text-[16px] font-line-regular text-center mt-[10px] px-[20px]">Head over to the home screen and add a new pair in your profile to track mileage!</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={shoes || []}
                            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                            renderItem={renderShoe}
                            contentContainerStyle={{ paddingBottom: 50 }}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default ShoeSelectionModal;
