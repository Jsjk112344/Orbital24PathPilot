import { Alert, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { decode as atob } from 'base-64';

export const showDisclaimer = (setTasks) => {
    Alert.alert(
        'Disclaimer',
        'Please ensure the Excel file is formatted as follows:\n\nName|\t|Food|\t|Address|\t|Remarks\n\nClick OK to proceed.',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => handleFileSelection(setTasks) }
        ]
    );
};

export const handleFileSelection = async (setTasks) => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });

        const file = res[0];
        const filePath = Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;
        const fileContent = await RNFS.readFile(filePath, 'base64');
        const binaryStr = atob(fileContent);

        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        parseExcelData(jsonData, setTasks);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // console.log('User cancelled the picker');
        } else {
            console.error('Error reading the file:', err);
            Alert.alert('Error', 'Unable to read the file.');
        }
    }
};

export const parseExcelData = (data, setTasks) => {
    const tasksArray = data.slice(1).map((row) => ({
        name: row[0],
        food: row[1],
        address: row[2],
        remarks: row[3],
    }));
    setTasks(tasksArray);

};
