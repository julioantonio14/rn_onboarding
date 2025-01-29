import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get('window');

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, slides } from "@/constants/data";

interface OnboardingProps { }

interface OnboradingItem {
    item: {
        id: string,
        image: any,
        title: string,
        subtitle: string
    }
}

const Slide = ({ item }: OnboradingItem) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                className="h-full w-full"
                source={item?.image}
                style={{ height: '75%', width, resizeMode: 'contain' }}
            />
            <View>
                <Text className="mt-20 text-2xl text-white font-bold text-center">{item?.title}</Text>
                <Text className="mt-5 text-white text-center" style={{ fontSize: 15, maxWidth: '90%', }}>{item?.subtitle}</Text>
            </View>
        </View>
    );
};


const Onboarding = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const FlatListref = React.useRef();

    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
      };

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        FlatListref?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
          const offset = nextSlideIndex * width;
          FlatListref?.current.scrollToOffset({ offset });
          setCurrentSlideIndex(currentSlideIndex + 1);
        }
        if(nextSlideIndex == slides.length){
            const offset = 0 * width;
            FlatListref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(0);
        }
      };
    return (
        <SafeAreaView className="" style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar hidden={true} />
            <FlatList
                ref={FlatListref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                contentContainerStyle={{ height: height * 0.75 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                data={slides}
                renderItem={({ item }) => <Slide item={item} />} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                {/* Render indicator */}
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentSlideIndex == index && {
                                backgroundColor: COLORS.white,
                                width: 25,
                            },
                        ]}
                    />
                ))}
            </View>
            <View style={{ marginBottom: '14%' }} className="text-center px-5 flex flex-row justify-between mt-4">
                <TouchableOpacity onPress={skip} className="bg-transparent rounded-lg flex-1 py-4 mb-5 text-center border-2 border-zinc-300">
                    <Text className="text-center font-semibold text-white ">SKIP</Text>
                </TouchableOpacity>
                <View style={{ width: 15 }} />
                <TouchableOpacity onPress={goToNextSlide} className="bg-white shadow-md shadow-zinc-300 rounded-lg flex-1 py-4 mb-5 text-center">
                    <Text className="text-center font-semibold">Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: {},
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    }
});
