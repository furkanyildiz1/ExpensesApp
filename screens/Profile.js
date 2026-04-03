import { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Switch } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";

import { GlobalStyles } from '../constants/styles';
import { AppContext } from '../store/app-context';
import { ExpensesContext } from '../store/expenses-context';

const screenWidth = Dimensions.get("window").width;

function Profile() {
    const appCtx = useContext(AppContext);
    const expensesCtx = useContext(ExpensesContext);

    const userName = "Furkan Yıldız";
    const profileImageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    // 1. Expense Chart Data
    const expenseData = expensesCtx.expenses.reduce((acc, expense) => {
        const name = expense.description || 'Other';
        if (!acc[name]) acc[name] = 0;
        acc[name] += expense.amount;
        return acc;
    }, {});

    const colors = ["#f39c12", "#e74c3c", "#8e44ad", "#2980b9", "#27ae60", "#f1c40f", "#34495e"];
    const pieChartData = Object.keys(expenseData).map((cat, index) => ({
        name: cat,
        population: expenseData[cat],
        color: colors[index % colors.length],
        legendFontColor: GlobalStyles.colors.primary800,
        legendFontSize: 12
    }));

    if (pieChartData.length === 0) {
        pieChartData.push({ name: 'Henüz Veri Yok', population: 1, color: '#bdc3c7', legendFontColor: GlobalStyles.colors.primary800, legendFontSize: 12 });
    }

    // 2. Stock Chart Data
    const stockLabels = Object.keys(appCtx.stocks);
    const stockData = stockLabels.map(lbl => {
        const val = parseInt(appCtx.stocks[lbl], 10);
        return isNaN(val) ? 0 : val;
    });
    
    // Fallback if no stocks
    if (stockLabels.length === 0) {
        stockLabels.push('Yok');
        stockData.push(0);
    }

    const barChartData = {
        labels: stockLabels,
        datasets: [
            {
                data: stockData.length > 0 ? stockData : [0]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: GlobalStyles.colors.primary50,
        backgroundGradientTo: GlobalStyles.colors.primary50,
        color: (opacity = 1) => `rgba(59, 2, 31, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(59, 2, 31, ${opacity})`,
        barPercentage: 0.6,
        decimalPlaces: 0,
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: profileImageUrl }}
                        style={styles.profileImage}
                    />
                </View>
                <Text style={styles.nameText}>{userName}</Text>
                
                <View style={styles.modeToggleContainer}>
                    <Text style={styles.modeText}>Kullanıcı Modu</Text>
                    <Switch 
                        value={appCtx.isBusinessMode} 
                        onValueChange={appCtx.toggleBusinessMode}
                        trackColor={{ false: GlobalStyles.colors.primary200, true: GlobalStyles.colors.primary500 }}
                        thumbColor={appCtx.isBusinessMode ? GlobalStyles.colors.primary800 : '#f4f3f4'}
                    />
                    <Text style={styles.modeText}>İşletme Modu</Text>
                </View>
            </View>

            <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                style={styles.sliderContainer}
            >
                {/* CARD 1: EXPENDITURES */}
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Gider Kategorileri</Text>
                        <PieChart
                            data={pieChartData}
                            width={screenWidth - 48}
                            height={220}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[10, 0]}
                            absolute
                        />
                        <Text style={styles.swipeHint}>Diğer kart için kaydır 👉</Text>
                    </View>
                </View>

                {/* CARD 2: STOCKS */}
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>
                            {appCtx.isBusinessMode ? "Stok Değişim Miktarları" : "İşletme Moduna Geçiniz"}
                        </Text>
                        {appCtx.isBusinessMode ? (
                            <BarChart
                                data={barChartData}
                                width={screenWidth - 48}
                                height={220}
                                yAxisLabel=""
                                chartConfig={chartConfig}
                                verticalLabelRotation={30}
                                style={styles.chartStyle}
                                fromZero={true}
                                showValuesOnTopOfBars={true}
                            />
                        ) : (
                            <View style={styles.fallbackContainer}>
                                <Text style={styles.fallbackText}>Stok verilerini görmek için üst kısımdan İşletme Modunu aktif hale getirin.</Text>
                            </View>
                        )}
                        <Text style={styles.swipeHint}>👈 Geri kaydır</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary50,
    },
    profileHeader: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: GlobalStyles.colors.primary100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: GlobalStyles.colors.primary500,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary800,
    },
    modeToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    modeText: {
        fontSize: 14,
        marginHorizontal: 8,
        color: GlobalStyles.colors.primary700,
        fontWeight: 'bold',
    },
    sliderContainer: {
        flex: 1,
        marginTop: 10,
    },
    card: {
        width: screenWidth,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary800,
        marginBottom: 15,
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16
    },
    fallbackContainer: {
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    fallbackText: {
        textAlign: 'center',
        color: GlobalStyles.colors.primary500,
        fontSize: 16,
    },
    swipeHint: {
        marginTop: 10,
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
        fontStyle: 'italic'
    }
});