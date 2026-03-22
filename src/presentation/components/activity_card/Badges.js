import { View, Text, Image } from 'react-native';
import { ExpandIcon } from '../../../../assets/icons/Icon';

const trophyImage = require('../../../../assets/images/trophee.png');

const Badges = ({ data }) => {
    return (
        <View className="flex-1 basis-0 bg-[#1E1E1E] rounded-[20px] p-[12px] justify-between shadow-md shadow-black h-[140px]">

            <View className="flex-row justify-between items-center">
                <Text className="text-primary text-[14px] font-line-bold">Badges</Text>
                <ExpandIcon />
            </View>

            <View className="flex-1 items-center justify-center">
                <Image
                    source={trophyImage}
                    className="w-[50px] h-[50px]"
                    resizeMode="contain"
                />
            </View>

            <View className="items-center">
                <Text className="text-white text-[16px] font-line-bold">
                    {data?.unlocked || 0} / {data?.total || 0}
                </Text>
            </View>
        </View>
    );
};

export default Badges;