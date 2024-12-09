import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, Button, Modal, TextInput, Pressable, Image, Dimensions } from 'react-native';
import DraggablePin from './DraggablePin';

const PinOverlay = ({ children }) => {
  const [pins, setPins] = useState({});
  const [mode, setMode] = useState('inactive'); // 'inactive', 'normal', 'place', 'drag', 'delete', 'write', 'move'
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWrite, setShowWrite] = useState(false);
  const [showText, setShowText] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [pinText, setPinText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [pinCoordinates, setPinCoordinates] = useState({ x: 0, y: 0 });

  const handlePress = (e) => {
    if (mode !== 'place') return;
    const { pageX, pageY } = e.nativeEvent;
    const id = Math.random().toString(36).substr(2, 9);
    setPins({ ...pins, [id]: { x: pageX - 14, y: pageY - 33, id, text: '' } });
    setMode('normal');
  };

  const handleDeletePin = (id) => {
    setShowConfirm(true);
    setMode('normal');
    setShowMenu(false);
  };

  const deletePin = () => {
    const { [selectedPin.id]: _, ...rest } = pins;
    setPins(rest);
    setShowConfirm(false);
  }

  const handleWritePin = () => {
    setPinText(selectedPin.text);
    setShowWrite(true);
  };

  const handleDragEnd = (id, newPosition) => {
    setPins({ ...pins, [id]: { ...pins[id], x: newPosition.x, y: newPosition.y } });
    setMode('nullmode');
  };

  const handleMoveSelection = () => {
    setShowMenu(false);
    setMode('drag');
  };

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    const { x, y } = getSelectedPinCoordinates(pin);
    setPinCoordinates({ x, y });
    setTimeout(() => {
      setShowMenu(!showMenu);
    }, 0);
  };

  const savePinText = () => {
    console.log(selectedPin.text);
    console.log(pinText);
    setPins({ ...pins, [selectedPin.id]: { ...selectedPin, text: pinText } });
    setSelectedPin({ ...selectedPin, text: pinText });
    console.log(selectedPin.text);
    console.log(pinText);
    setShowWrite(false);
  };

  const getSelectedPinCoordinates = (pin) => {
    if (!pin) return { x: 0, y: 0 };
    return { x: pin.x, y: pin.y };
  };

  return (
    <View style={styles.overlayContainer}>
      {Object.values(pins).map((pin) => (
        <TouchableOpacity key={pin.id} onPress={() => handlePinClick(pin)}>
          <DraggablePin
            initialPosition={{ x: pin.x, y: pin.y }}
            onDragEnd={(newPos) => handleDragEnd(pin.id, newPos)}
            draggable={mode === 'drag'}
          />
        </TouchableOpacity>
      ))}

      {(
        <>
          {children}
          <View style={styles.leftPanel}>
            <Pressable onPress={() => setMode('place')} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Place pin</Text>
            </Pressable>
          </View>
          {mode === 'place' && (
            <TouchableWithoutFeedback onPress={handlePress}>
              <View style={styles.touchArea} />
            </TouchableWithoutFeedback>
          )}
        </>
      )}

      {showMenu && selectedPin && (
        // <Modal visible={showMenu}>
        <View style={[styles.pinOption, { left: pinCoordinates.x - 30, top: pinCoordinates.y - 45 }]}>
          <Pressable onPress={() => handleWritePin(selectedPin)}>
            <Image style={styles.icon} source={require('./assets/edit_icon.png')} />
          </Pressable>
          <Pressable onPress={() => handleDeletePin(selectedPin.id)}>
            <Image style={styles.icon} source={require('./assets/delete_icon.png')} />
          </Pressable>
          <Pressable onPress={() => setShowText(true)}>
            <Image style={styles.icon} source={require('./assets/view_icon.png')} />
          </Pressable>
          <Pressable onPress={() => handleMoveSelection()}>
            <Image style={styles.icon} source={require('./assets/move_icon.png')} />
          </Pressable>
        </View>
        /* </Modal> */
      )}

      {showText && selectedPin && (
        <View style={styles.modalBackground}>
          <View style={styles.textModalContainer}>
            <Text style={styles.textModalContent}>{selectedPin.text}</Text>
            <Button style={styles.optionButton} title="Close" onPress={() => setShowText(false)} />
          </View>
        </View>
      )}

      {showWrite && selectedPin && (
        <View style={styles.textInputContainer}>
          <View style={styles.editBox}>
            <TextInput
              style={styles.textInput}
              value={pinText}
              onChangeText={setPinText}
              placeholder="Enter text here..."
            />
            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.optionButtonLeft} onPress={savePinText}>
                <Text>Save</Text>
              </Pressable>
              <Pressable style={styles.optionButtonRight} onPress={savePinText} >
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {showConfirm && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showConfirm}
          onRequestClose={() => setShowConfirm(false)}
        >
          <View style={styles.textInputContainer}>
            <View style={styles.deleteBox}>
              <Text style={styles.modalText}>Are you sure you want to delete this pin?</Text>
              <View style={styles.rowFlex}>
                <Pressable style={styles.deleteButton} onPress={() => setShowConfirm(false)}>
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={() => deletePin()} >
                  <Text>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )
      }
    </View>
  );
};

PinOverlay.propTypes = {
  children: PropTypes.node, // Validate that 'children' is a valid React node (string, number, element, etc.)
};

const { x, y } = Dimensions.get('window');

const styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalText: {
    color: '#rgba(245, 245, 220, 1)',
  },
  textInputContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  optionButtonLeft: {
    borderRadius: 5,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    padding: 10,
    bottom: 10,
    left: 10,
  },
  optionButtonRight: {
    borderRadius: 5,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    padding: 10,
    bottom: 10,
    right: 10,
  },
  deleteButton: {
    borderRadius: 5,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    padding: 10,
    flexDirection: 'row',
    margin: 10,
  },
  editBox: {
    width: 300,
    height: 120,
    backgroundColor: '#1B1921',
    borderRadius: 10,
    borderColor: '#rgba(245, 245, 220, 1)',
    borderWidth: 5,
  },
  deleteBox: {
    width: 300,
    height: 100,
    backgroundColor: '#1B1921',
    borderRadius: 10,
    borderColor: '#rgba(245, 245, 220, 1)',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 10,
    marginBottom: 10,
    width: 110,
    padding: 8,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Enchanted Land',
    fontSize: 20,
  },
  pinOption: {
    position: 'absolute',
    backgroundColor: '#rgba(245, 245, 220, 1)',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 20,
    pointerEvents: 'box-none', // Allow touch events to pass through the overlay
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    zIndex: 1000,
  },
  activeToggleButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    zIndex: 1000,
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pinButtonImage: {
    resizeMode: 'fill',
  },
  leftPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 50,
    zIndex: 100,
  },
  textModalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModalContent: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  confirmModalBackground: {
    backgroundColor: 'lightyellow',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInput: {
    height: 40,
    borderColor: '#1B1921',
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    margin: 10,
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PinOverlay;