import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  ScrollView
} from "react-native";
import { useState, useContext, useCallback} from "react";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../../styles/theme.style";
import InputField from "../components/V2Components/InputField";
import { AuthContext } from "../../context";
import ScreenLayout from "../components/V2Components/ScreenLayout";
import { useFocusEffect } from "@react-navigation/native";

const isWeb = Platform.OS === 'web'

function CalendarScreen() {
  const [currentMonth, setMonth] = useState(
    parseInt(new Date().toISOString().slice(5, 7))
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0,10));
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext);
  const [reminders, setReminders] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().slice(0,10));
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [selectedTab, setSelectedTab] = useState('reminders');

  const {width} = useWindowDimensions();
  const isLandscape = width > 700

  const handleDayPress = (date) => {
    setSelectedDay(date.dateString)
    setDueDate(date.dateString);
  };
  const ReminderCreation = async () => {
    try {
      const response = await fetch(process.env.BACKEND_IP_PORT+"/reminders/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          dueDate: dueDate,
          token: token,
        }),
        https: process.env.HTTP,
      });
      const result = await response.json();
      if (response.status == 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const clearInputs = () => {
    setDueDate("");
    setTitle("");
    setDescription("");
  };

  useFocusEffect(
    useCallback(() => {
      const getReminders = async () => {
        try {
          const res = await fetch(
            process.env.BACKEND_IP_PORT+"/reminders/my_reminders_day",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                selectedDay: selectedDay
              }),
              https: process.env.HTTP,
            }
          );
          const data = await res.json();
          if (res.status == 200) {
            setReminders(data.reminders);
          } else {
            console.log("Error occured getting reminders");
          }
        } catch (error) {
          console.log(error);
        }
      };
      getReminders();
    }, [selectedDay, success])
  );

  const renderDay = (date, now) => {
  const isCurrentMonth = date.month === currentMonth;

  return (
    <TouchableOpacity
      onPress={() => handleDayPress(date)}
      opacity={isCurrentMonth ? 1 : 0}
      style={{
        backgroundColor:
          date.dateString === now
            ? '#AFD2FF'
            : isCurrentMonth
            ? theme.CONTENT_MODULE_COLOR
            : "white",
        width: '80%',
        aspectRatio: 1.2,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: date.dateString === selectedDay ? '#AFD2FF' : theme.CONTENT_MODULE_COLOR,
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <Text style={{color: isCurrentMonth ? theme.TEXT_COLOR : 'black'}}>{date.day}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <ScreenLayout>
      <View style={{
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: isLandscape ? 'row' : 'column',
        width: '100%',
      }}>
        <View style={{ width: isLandscape ? '66%' : '100%'}}>
          <Calendar
            style={styles.calendar}
            onDayPress={handleDayPress}
            onMonthChange={(date) =>
              setMonth(parseInt(date.dateString.slice(5, 7)))
            }
            renderArrow={(direction) => {
              if (direction == "left")
                return <Ionicons name="chevron-back-outline" size={30} />;
              if (direction == "right")
                return <Ionicons name="chevron-forward-outline" size={30} />;
            }}
            dayComponent={({ date }) =>
              renderDay(date, new Date().toISOString().slice(0, 10))
            }
            theme={{
              monthTextColor: theme.TEXT_COLOR,
              calendarBackground: theme.CONTAINER_COLOR,
            }}
            current={new Date().toISOString().slice(0, 10)}
            monthFormat={"MMMM yyyy"}
            monthOnly={true}
          />
        </View>
        {!isLandscape && <View style={{
          height: 15,
          width: '100%',
          flexDirection: 'row',
          marginBottom: 10}}
          >
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('reminders');
              setSuccess(false);
              setDescription('');
              setTitle('');
            }}
            style={{
              flex: 1,
              backgroundColor: (selectedTab === 'reminders') ? '#AFD2FF' : '#DCEAFE',
              borderRadius: 5,
              marginLeft: 15,
              marginRight: 5
            }}
          />
          <TouchableOpacity
            onPress={() => setSelectedTab('create')}
            style={{
              flex: 1,
              backgroundColor: (selectedTab === 'create') ? '#AFD2FF' : '#DCEAFE',
              borderRadius: 5,
              marginRight: 15,
              marginLeft: 5
            }}
          />
        </View>}
        <View style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: "column",
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          }}>
          {((selectedTab === 'create') || isLandscape) && <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            display: success ? 'none' : 'flex'
            }}>
			<Text style={styles.textHead}>Create Reminder</Text>
            <InputField
              placeholder={"Date Format: YYYY-MM-DD"}
              value={dueDate}
              onChangeText={setDueDate}
              style={styles.TextInput}
            />
            <InputField
              placeholder={"Title"}
              value={title}
              onChangeText={setTitle}
              style={styles.TextInput}
            />
            <InputField
              placeholder={"Description"}
              value={description}
              onChangeText={setDescription}
              style={styles.TextInput}
            />
            {!isWeb && <View
              style={{
                flexDirection: "row",
                
              }}
            >
              <Button
                
                title="Save"
                onPress={ReminderCreation}
              />
              <Button title="Clear" onPress={clearInputs} />
            </View>}
            {isWeb && <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 50,
              }}
            >
              <TouchableOpacity
                onPress={ReminderCreation}
                style={{
                  flex: 1,
                  backgroundColor: '#AFD2FF',
                  borderRadius: 5,
                  marginRight: 5,
                  width: 90,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{fontWeight: 'bold'}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={clearInputs}
                style={{
                  flex: 1,
                  backgroundColor: '#FFAAAA',
                  borderRadius: 5,
                  marginLeft: 5,
                  width: 90,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{fontWeight: 'bold'}}>Clear</Text>
              </TouchableOpacity>
            </View>}
          </View>}
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            display: success ? 'flex' : 'none'
          }}>
            <Text style={{ color: 'deepskyblue', marginBottom: 10, fontFamily: 'Roboto', fontSize: 18 }}>
              Your reminder was created successfully!
            </Text>
          <TouchableOpacity 
          onPress={() => {setSuccess(false); setDescription('');setTitle('');}}
          style={{
                  backgroundColor: 'dodgerblue',
                  borderRadius: 50,
                  marginLeft: 5,
                  width: 200,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center'
            }}>
              <Text style={{fontSize: 15, fontFamily: 'Inter', color: 'white'}}>Finish</Text>
            </TouchableOpacity>
          </View>
          {((selectedTab === 'reminders') || isLandscape) && <View style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
			
			  <Text style={styles.textHead}>Reminders</Text>
              <ScrollView style={styles.tile}>
              {reminders ? (
                <View style={styles.Box}>
                  {reminders.map((item) => (
                    <TouchableOpacity
                      style={styles.ContentModule}
                      key={item._id}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          marginBottom: 4.4,
                          width: isWeb ? '100%' : undefined,
                        }}
                      >
                        <View
                          style={{
                            alignItems: "flex-start",
                            flexDirection: "column",
                            width: isWeb ? '100%' : undefined,
                          }}
                        >
                          <Text
                            style={[styles.text, { fontWeight: "bold" }]}
                          >{monthNames[parseInt(item.dueDate.slice(5,7))-1]}
                            {', '}
                            {item.dueDate.slice(8,10)}
                            {' '}
                            {item.dueDate.slice(0,4)}
                            </Text>
                          <Text style={[styles.text, { fontWeight: "bold" }]}>
                            {`${item.title}`}{" "}
                          </Text>
                          <Text style={[styles.text, { fontWeight: "bold" }]}>
                            {`${item.description}`}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View>
                  <Text style={styles.text}>Loading...</Text>
                </View>
              )}
            </ScrollView>
          </View>}
        </View>
      </View>
    </ScreenLayout>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  button: {
    
  },
  modal: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,

  },
  TextInput: {
    height: 40,
    width: 220,
    marginBottom: 10,
    fontSize: 15,
    color: theme.TEXT_COLOR,
  },
  ContentModule: {
    flexBasis: isWeb ? undefined : "100%",
    marginHorizontal: 10,
    marginBottom: 8.8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: theme.CONTENT_MODULE_COLOR,
    borderRadius: 10,
    padding: 8.8,
  },
  tile: {
    width: "100%",
    height: 400,
  },
  text: {
    color: theme.TEXT_COLOR,
    fontSize: 15,
  },
  textHead: {
	fontSize: 25,
    height: 60,
  }
});
