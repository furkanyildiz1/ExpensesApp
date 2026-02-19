import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function StockController() {
    const Drawer = createDrawerNavigator();

    //categori ve stok statelerini burada tanımlıcam
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    // use object for stocks so we can index by category name
    const [stocks, setStocks] = useState({});

    const addCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed) {
            return;
        }
        if (categories.includes(trimmed)) {
            setNewCategory('');
            return;
        }
        setCategories((prev) => [...prev, trimmed]);
        setStocks((prev) => ({ ...prev, [trimmed]: 0 }));
        setNewCategory('');
    };

    const selectCategory = (cat) => {
        setSelectedCategory(cat);
    };

    return (
        <View style={styles.container}>
            {/* add new category input */}
            <View style={styles.addContainer}>
                <TextInput
                    value={newCategory}
                    onChangeText={setNewCategory}
                    placeholder="Yeni kategori ekle"
                    style={styles.input}
                />
                <Button title="Ekle" onPress={addCategory} />
            </View>

            {/* horizontal category list */}
            <ScrollView horizontal style={styles.categoriesContainer}>
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.categoryChip,
                            selectedCategory === cat && styles.selectedChip,
                        ]}
                        onPress={() => selectCategory(cat)}
                    >
                        <Text style={styles.categoryText}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* display stock for selected category */}
            <View style={styles.stockContainer}>
                {selectedCategory ? (
                    <>
                        <Text style={styles.stockText}>
                            {selectedCategory} stok miktarı: {stocks[selectedCategory]}
                        </Text>
                        <View style={styles.addContainer}>
                            <TextInput
                                keyboardType="numeric"
                                placeholder="Yeni stok miktarı"
                                style={styles.input}
                                onChangeText={(text) => {
                                    const val = parseInt(text, 10);
                                    if (!isNaN(val)) {
                                        setStocks((prev) => ({
                                            ...prev,
                                            [selectedCategory]: val,
                                        }));
                                    }
                                }}
                                value={
                                    stocks[selectedCategory] !== undefined
                                        ? String(stocks[selectedCategory])
                                        : ''
                                }
                            />
                            <Button
                                title="Kaydet"
                                onPress={() => {
                                    
                                }}
                            />
                        </View>
                    </>
                ) : (
                    <Text style={styles.stockText}>Bir kategori seçin</Text>
                )}
            </View>
        </View>
    );
}
export default StockController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  categoriesContainer: {
    marginVertical: 8,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 16,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#cde',
  },
  categoryText: {
    fontSize: 14,
  },
  stockContainer: {
    marginTop: 24,
  },
  stockText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});