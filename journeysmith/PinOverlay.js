import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, Button, Modal, TextInput, Pressable, Image } from 'react-native';
import DraggablePin from './DraggablePin';

const PinOverlay = ({ children }) => {
  const [pins, setPins] = useState({});
  const [mode, setMode] = useState('inactive'); // 'inactive', 'normal', 'place', 'drag', 'delete', 'write', 'move'
  const [showOverlay, setShowOverlay] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWrite, setShowWrite] = useState(false);
  const [showText, setShowText] = useState(false);
  const [pinToDelete, setPinToDelete] = useState(null);
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
    setPins(pins.filter((pin) => pin.id !== id));
    setShowConfirm(false);
    setMode('normal');
  };

  const handleWritePin = (pin) => {
    setSelectedPin(pin);
    setPinText(pin.text);
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
    if (mode === 'delete') {
      const { [pin.id]: _, ...rest } = pins;
      setPins(rest);
    } else if (mode === 'write') {
      handleWritePin(pin);
    } else if (mode === 'normal') {
      setSelectedPin(pin);
      const { x, y } = getSelectedPinCoordinates(pin);
      setPinCoordinates({ x, y });
      setTimeout(() => {
        setShowMenu(!showMenu);
      }, 0);
    } else {
      setMode('normal');
    }
  };

  const savePinText = () => {
    setPins({ ...pins, [selectedPin.id]: { ...selectedPin, text: pinText } });
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
        <View style={[styles.pinOption, { left: pinCoordinates.x, top: pinCoordinates.y }]}>
          <Pressable onPress={() => handleWritePin(selectedPin)}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable onPress={() => setMode('delete')}>
            <Text>Delete</Text>
          </Pressable>
          <Pressable onPress={() => setShowText(true)}>
            <Text>View</Text>
          </Pressable>
          <Pressable onPress={() => handleMoveSelection()}>
            <Text>Move</Text>
          </Pressable>
        </View>
      )}

      {showText && selectedPin && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showText}
          onRequestClose={() => setShowText(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.textModalContainer}>
              <Text style={styles.textModalContent}>{selectedPin.text}</Text>
              <Button title="Close" onPress={() => setShowText(false)} />
            </View>
          </View>
        </Modal>
      )}

      {showWrite && selectedPin && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showWrite}
          onRequestClose={savePinText} // Save text when modal is closed
        >
          <View style={styles.modalBackground}>
            <View style={[styles.modalContainer, styles.editModalBackground]}>
              <Text style={styles.modalText}>Edit Pin Text</Text>
              <TextInput
                style={styles.textInput}
                value={pinText}
                onChangeText={setPinText}
                placeholder="Enter text here..."
              />
              <View style={styles.modalButtonContainer}>
                <Button title="Save" onPress={savePinText} />
                <Button title="Close" onPress={savePinText} />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {showConfirm && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showConfirm}
          onRequestClose={() => setShowConfirm(false)}
        >
          <View style={styles.modalBackground}>
            <View style={[styles.modalContainer, styles.confirmModalBackground]}>
              <Text style={styles.modalText}>Are you sure you want to delete this pin?</Text>
              <View style={styles.modalButtonContainer}>
                <Button title="Cancel" onPress={() => setShowConfirm(false)} />
                <Button title="Yes" onPress={() => handleDeletePin(pinToDelete)} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
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
  activeOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    pointerEvents: 'box-none',
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 300,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
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
  editModalBackground: {
    backgroundColor: 'lightgrey',
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default PinOverlay;