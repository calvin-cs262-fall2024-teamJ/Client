import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, Button, Modal, TextInput, Pressable, Image, Dimensions } from 'react-native';
import DraggablePin from './DraggablePin';

const PinOverlay = ({ children }) => {
  // State variable to store the pins
  const [pins, setPins] = useState({});
  // State variable to manage the current mode (e.g., 'inactive', 'normal', 'place', 'drag', 'delete', 'write', 'move')
  const [mode, setMode] = useState('inactive');
  // State variable to control the visibility of the confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  // State variable to control the visibility of the write modal
  const [showWrite, setShowWrite] = useState(false);
  // State variable to control the visibility of the text modal
  const [showText, setShowText] = useState(false);
  // State variable to store the currently selected pin
  const [selectedPin, setSelectedPin] = useState(null);
  // State variable to store the text for the selected pin
  const [pinText, setPinText] = useState('');
  // State variable to control the visibility of the pin action menu
  const [showMenu, setShowMenu] = useState(false);
  // State variable to store the coordinates of the pin action menu
  const [pinCoordinates, setPinCoordinates] = useState({ x: 0, y: 0 });

  // Handle press event to place a pin
  const handlePress = (e) => {
    // If not in place mode do nothing
    if (mode !== 'place') return;
    // Else place a pin
    const { pageX, pageY } = e.nativeEvent;
    const id = Math.random().toString(36).substr(2, 9);
    setPins({ ...pins, [id]: { x: pageX - 14, y: pageY - 33, id, text: '' } });
    setMode('normal');
  };

  // Delete a pin
  const handleDeletePin = (id) => {
    // Ask for confirmation
    setShowConfirm(true);
    // Leave delete mode and hide the menu
    setMode('normal');
    setShowMenu(false);
  };

  // Remove the pin from the list of pins
  const deletePin = () => {
    const { [selectedPin.id]: _, ...rest } = pins;
    setPins(rest);
    setShowConfirm(false);
  }

  // Write text on the pin
  const handleWritePin = () => {
    setPinText(selectedPin.text);
    setShowWrite(true);
  };

  // Save new pin position at the end of a drag action
  const handleDragEnd = (id, newPosition) => {
    setPins({ ...pins, [id]: { ...pins[id], x: newPosition.x, y: newPosition.y } });
    setMode('nullmode');
  };

  // Change to drag mode when selected
  const handleMoveSelection = () => {
    setShowMenu(false);
    setMode('drag');
  };

  // Handle clicking on a pin
  const handlePinClick = (pin) => {
    // Set the state to indicate the clicked pin
    setSelectedPin(pin);
    // Get the coordinates of the pin
    const { x, y } = getSelectedPinCoordinates(pin);
    setPinCoordinates({ x, y });
    setTimeout(() => {
      setShowMenu(!showMenu);
    }, 0);
  };

  // Save edited text to the pin
  const savePinText = () => {
    // Update the pin text in the array
    setPins({ ...pins, [selectedPin.id]: { ...selectedPin, text: pinText } });
    // Necessary line to update the state of the selected pin to include the text
    setSelectedPin({ ...selectedPin, text: pinText });
    setShowWrite(false);
  };

  // Get the coordinates of the selected pin
  const getSelectedPinCoordinates = (pin) => {
    if (!pin) return { x: 0, y: 0 };
    return { x: pin.x, y: pin.y };
  };

  // Main function to render the component
  return (
    // Container for the overlay
    <View style={styles.overlayContainer}>
      {/* Render the pins */}
      {Object.values(pins).map((pin) => (
        <TouchableOpacity key={pin.id} onPress={() => handlePinClick(pin)}>
          <DraggablePin
            initialPosition={{ x: pin.x, y: pin.y }}
            onDragEnd={(newPos) => handleDragEnd(pin.id, newPos)}
            draggable={mode === 'drag'}
          />
        </TouchableOpacity>
      ))}

      {/* Render the panel on the left for buttons */}
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

      {/* Render the pin action menu if the pin is selected */}
      {showMenu && selectedPin && (
        <View style={[styles.pinOption, { left: pinCoordinates.x - 30, top: pinCoordinates.y - 100 }]}>
          <Pressable onPress={() => handleWritePin(selectedPin)}>
            <Image style={styles.icon} source={require('./assets/edit_icon.png')} />
          </Pressable>
          <Pressable onPress={() => setShowText(true)}>
            <Image style={styles.icon} source={require('./assets/view_icon.png')} />
          </Pressable>
          <Pressable onPress={() => handleDeletePin(selectedPin.id)}>
            <Image style={styles.icon} source={require('./assets/delete_icon.png')} />
          </Pressable>
          <Pressable onPress={() => handleMoveSelection()}>
            <Image style={styles.icon} source={require('./assets/move_icon.png')} />
          </Pressable>
        </View>
      )}

      {/* Render the selected pin's text */}
      {showText && selectedPin && (
        <View style={styles.modalBackground}>
          <View style={styles.textModalContainer}>
            <Text style={styles.textModalContent}>{selectedPin.text}</Text>
            <Pressable style={styles.optionButtonRight} onPress={() => setShowText(false)} >
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Render the text input for addition of text to pin */}
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
            {/* close three views lol */}
            </View>
          </View>
        </View>
      )}

      {/* Render the delete confirmation when being asked to confirm a delete */}
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
              {/* close five views holyyyy */}
              </View>
            </View>
          </View>
        </Modal>
      )
      }
    </View>
  );
};

// Define the styles for the component
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
  // confirm, save, and close buttons
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
  // boxes for text confirmation
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
  // button styles for deletes, saves, and closes
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
  // style for pin buttons
  pinOption: {
    position: 'absolute',
    backgroundColor: '#rgba(245, 245, 220, 1)',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  icon: {
    width: 60,
    height: 60,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 20,
    pointerEvents: 'box-none', // Allow touch events to pass through the overlay
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
    backgroundColor: '#1B1921',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModalContent: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#rgba(245, 245, 220, 1)',
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
  // For a touchable transparent component that fills the screen
  touchArea: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PinOverlay;