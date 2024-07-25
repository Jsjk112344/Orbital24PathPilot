import { Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { decode as atob } from 'base-64';
import { showDisclaimer, handleFileSelection, parseExcelData } from '../TaskListHandler';

// Mock the dependencies
jest.mock('react-native-document-picker', () => ({
  pick: jest.fn(),
  types: {
    allFiles: 'allFiles',
  },
  isCancel: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
}));

jest.mock('base-64', () => ({
  decode: jest.fn(),
}));

jest.mock('xlsx', () => ({
  read: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));

describe('Task List Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Import Task List', async () => {
    const setTasks = jest.fn();

    // Mock the file selection to return the actual Excel file path
    DocumentPicker.pick.mockResolvedValueOnce([{ uri: 'file://../PathPilot Test Sheet.xlsx' }]);
    RNFS.readFile.mockResolvedValueOnce('base64encodeddata');
    atob.mockReturnValue('decodeddata');
    XLSX.read.mockReturnValue({
      SheetNames: ['Sheet1'],
      Sheets: {
        'Sheet1': {}
      }
    });
    XLSX.utils.sheet_to_json.mockReturnValue([
      ['Name', 'Food', 'Address', 'Remarks'],
      ['Ms Lee', 'Chicken Rice', '#02-19', 'Does not like spicy food'],
      ['Mr Tan', 'Bak Chor Mee', 'Blk 513 Toa Payoh Rise', 'Leave food outside'],
      ['Mr Chan', 'Chicken Rice', '23 Jalan Rajah', ''],
      ['Ms Lye', 'Mee Tai Mak', 'Blk 529', ''],
      ['Mr Lim', 'Fried Rice', 'Blk 123', 'Likes spicy food'],
      ['Ms Ong', 'Laksa', 'Blk 456', 'Allergic to peanuts'],
      ['Mr Goh', 'Fish Soup', 'Blk 789', 'Vegetarian'],
      ['Ms Teo', 'Hokkien Mee', 'Blk 101', ''],
      ['Mr Wong', 'Nasi Lemak', 'Blk 202', 'No pork'],
      ['Ms Tan', 'Roti Prata', 'Blk 303', 'Gluten-free'],
    ]);

    // Call the handleFileSelection function
    await handleFileSelection(setTasks);

    // Verify the expected function calls and arguments
    expect(DocumentPicker.pick).toHaveBeenCalledWith({ type: [DocumentPicker.types.allFiles] });
    expect(RNFS.readFile).toHaveBeenCalledWith(expect.stringContaining('PathPilot Test Sheet.xlsx'), 'base64');
    expect(atob).toHaveBeenCalled();
    expect(XLSX.read).toHaveBeenCalled();
    expect(XLSX.utils.sheet_to_json).toHaveBeenCalled();

    // Verify that the setTasks function is called with the expected parsed data
    expect(setTasks).toHaveBeenCalledWith([
      { name: 'Ms Lee', food: 'Chicken Rice', address: '#02-19', remarks: 'Does not like spicy food' },
      { name: 'Mr Tan', food: 'Bak Chor Mee', address: 'Blk 513 Toa Payoh Rise', remarks: 'Leave food outside' },
      { name: 'Mr Chan', food: 'Chicken Rice', address: '23 Jalan Rajah', remarks: '' },
      { name: 'Ms Lye', food: 'Mee Tai Mak', address: 'Blk 529', remarks: '' },
      { name: 'Mr Lim', food: 'Fried Rice', address: 'Blk 123', remarks: 'Likes spicy food' },
      { name: 'Ms Ong', food: 'Laksa', address: 'Blk 456', remarks: 'Allergic to peanuts' },
      { name: 'Mr Goh', food: 'Fish Soup', address: 'Blk 789', remarks: 'Vegetarian' },
      { name: 'Ms Teo', food: 'Hokkien Mee', address: 'Blk 101', remarks: '' },
      { name: 'Mr Wong', food: 'Nasi Lemak', address: 'Blk 202', remarks: 'No pork' },
      { name: 'Ms Tan', food: 'Roti Prata', address: 'Blk 303', remarks: 'Gluten-free' },
    ]);
  });

  test('View Task List', () => {
    const setTasks = jest.fn();
    const mockJsonData = [
      ['Name', 'Food', 'Address', 'Remarks'],
      ['John', 'Pizza', '123 Main St', 'Deliver at 2pm'],
      ['Jane', 'Burger', '456 Elm St', 'Deliver at 3pm'],
    ];

    parseExcelData(mockJsonData, setTasks);

    expect(setTasks).toHaveBeenCalledWith([
      { name: 'John', food: 'Pizza', address: '123 Main St', remarks: 'Deliver at 2pm' },
      { name: 'Jane', food: 'Burger', address: '456 Elm St', remarks: 'Deliver at 3pm' },
    ]);
  });

  test('Mark Task as Completed', () => {
    // This test case is not applicable for the provided code.
    // The code doesn't include the logic for marking a task as completed.
    // You would need to add that logic and then write a test case for it.
  });

  test('Show Disclaimer', () => {
    const setTasks = jest.fn();
    Alert.alert = jest.fn();

    showDisclaimer(setTasks);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Disclaimer',
      'Please ensure the Excel file is formatted as follows:\n\nName|\t|Food|\t|Address|\t|Remarks\n\nClick OK to proceed.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: expect.any(Function) },
      ]
    );
  });

  test('Handle File Selection Error', async () => {
    const setTasks = jest.fn();
    const errorMessage = 'Unable to read the file.';

    DocumentPicker.pick.mockRejectedValueOnce(new Error(errorMessage));
    Alert.alert = jest.fn();

    await handleFileSelection(setTasks);

    expect(DocumentPicker.pick).toHaveBeenCalledWith({ type: [DocumentPicker.types.allFiles] });
    expect(Alert.alert).toHaveBeenCalledWith('Error', errorMessage);
  });

  test('Handle User Cancellation', async () => {
    const setTasks = jest.fn();

    DocumentPicker.pick.mockRejectedValueOnce({ code: 'DOCUMENT_PICKER_CANCELED' });
    DocumentPicker.isCancel.mockReturnValueOnce(true);

    await handleFileSelection(setTasks);

    expect(DocumentPicker.pick).toHaveBeenCalledWith({ type: [DocumentPicker.types.allFiles] });
    expect(DocumentPicker.isCancel).toHaveBeenCalledWith({ code: 'DOCUMENT_PICKER_CANCELED' });
    expect(setTasks).not.toHaveBeenCalled();
  });
});
