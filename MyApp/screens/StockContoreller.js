import React, { useState, useContext } from 'react';
import { AppContext } from '../store/app-context';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/UI/Button';

function StockController() {
    const appCtx = useContext(AppContext);
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newStockInput, setNewStockInput] = useState('');
    const [listStock, setListStock] = useState({});

    const addCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed) {
            return;
        }
        if (appCtx.categories.includes(trimmed)) {
            setNewCategory('');
            return;
        }
        appCtx.addCategory(trimmed);
        setNewCategory('');
    };

    const selectCategory = (cat) => {
        setSelectedCategory(cat);
        setNewStockInput('');
    };


    return (
        <View style={styles.container}>
            <View style={styles.addContainer}>
                <TextInput
                    value={newCategory}
                    onChangeText={setNewCategory}
                    placeholder="Add new category"
                    placeholderTextColor={GlobalStyles.colors.primary700}
                    style={styles.input}
                />
                <CustomButton mode="flat" style={styles.addButton} onPress={addCategory}>
                    Add
                </CustomButton>
            </View>

            {/* horizontal category list */}
            <View style={styles.categoriesWrapper}>
                <ScrollView horizontal style={styles.categoriesContainer}>
                    {Array.isArray(appCtx.categories) &&
                        appCtx.categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryChip,
                                    selectedCategory === cat && styles.selectedChip,
                                ]}
                                onPress={() => selectCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === cat && styles.selectedCategoryText
                                ]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>

            <View style={styles.stockContainer}>
                {selectedCategory ? (
                    <>
                        <View style={styles.expenseItem}>
                            <View>
                                <Text style={[styles.textBase, styles.description]}>
                                    {selectedCategory} Stock
                                </Text>
                                <Text style={styles.textBase}>Current quantity</Text>
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={styles.amount}>{appCtx.stocks[selectedCategory]}</Text>
                            </View>
                        </View>
                        <View style={[styles.addContainer, styles.editStockContainer]}>
                            <TextInput
                                keyboardType="numeric"
                                placeholder={
                                    appCtx.stocks[selectedCategory] !== undefined && appCtx.stocks[selectedCategory] !== ''
                                        ? "Update stock quantity"
                                        : "New stock quantity"
                                }
                                placeholderTextColor={GlobalStyles.colors.primary700}
                                style={styles.input}
                                onChangeText={setNewStockInput}
                                value={newStockInput}
                            />
                            <CustomButton
                                style={styles.addButton}
                                onPress={() => {
                                    const val = parseInt(newStockInput, 10);
                                    if (!isNaN(val)) {
                                        appCtx.setStock(selectedCategory, val);
                                        setListStock(prev => ({
                                            ...prev,
                                            [selectCategory]: [
                                                {miktar: val, tarih: new Date()},
                                                ...(prev[selectedCategory] || [])
                                            ]
                                        }))
                                        setNewStockInput('');
                                    }
                                }}
                            >
                                Save
                            </CustomButton>
                        </View>
                        <FlatList
                            data={listStock[selectedCategory] || []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.stockHistoryItem}>
                                    <Text style={styles.stockHistoryText}>
                                        Miktar: {item.miktar} - Tarih: {item.tarih.toLocaleString()}
                                    </Text>
                                </View>
                            )}
                            style={styles.stockHistoryList}
                        />
                    </>
                ) : (
                    <Text style={styles.infoText}>Choose a category</Text>
                )}
            </View>
        </View>
    );
}
export default StockController;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    input: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 10,
        borderRadius: 6,
        fontSize: 16,
        marginRight: 8,
    },
    addButton: {
        minWidth: 80,
    },
    categoriesWrapper: {
        height: 60,
    },
    categoriesContainer: {
        marginVertical: 4,
    },
    categoryChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 24,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        height: 40,
    },
    selectedChip: {
        backgroundColor: GlobalStyles.colors.primary100,
    },
    categoryText: {
        fontSize: 14,
        color: GlobalStyles.colors.primary50,
        fontWeight: 'bold',
    },
    selectedCategoryText: {
        color: GlobalStyles.colors.primary700,
    },
    stockContainer: {
        marginTop: 16,
        flex: 1,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
        fontSize: 16,
    },
    editStockContainer: {
        marginTop: 16,
    }
});