import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RunCard from './RunCard';

const RecentRuns = ({ runs }) => {
    const navigation = useNavigation();

    if (!runs || runs.length === 0) {
        return (
            <View className="flex-col mb-[30px]">
                <View className="flex-row justify-between items-baseline mb-[10px]">
                    <Text className="font-line-bold text-[24px] text-primary">Recent Runs</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AllRunsPage')}>
                        <Text className="text-[14px] text-white font-line-bold">See all</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-1 items-center justify-center">
                    <Text className="text-[#AAAAAA] font-line">No run history yet.</Text>
                </View>
            </View>
        );
    }
    return (
        <View className="flex-col mb-[30px]">
            <View className="flex-row justify-between items-baseline mb-[10px]">
                <Text className="font-line-bold text-[24px] text-primary">Recent Runs</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AllRunsPage')}>
                    <Text className="text-[14px] text-white font-line-bold">See all</Text>
                </TouchableOpacity>
            </View>
            <View className="gap-y-[15px]">
                {runs?.map((run) => (
                    <RunCard
                        key={run.id}
                        data={run}
                        onPress={() => navigation.navigate('RunHistoryDetailScreen', { runId: run.id })}
                    />
                ))}
            </View>
        </View>
    );
}

export default RecentRuns;
