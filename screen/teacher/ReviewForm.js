
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const ReviewForm = ({ formData }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        {/* PERSONAL INFORMATION */}
        <Text style={styles.sectionHeader}>Personal Information</Text>

        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value="Dela Cruz" editable={false} />

        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value="Anna Marie" editable={false} />

        <Text style={styles.label}>Middle Name</Text>
        <TextInput style={styles.input} value="Garcia" editable={false} />

        <Text style={styles.label}>Extension</Text>
        <TextInput style={styles.input} value="" editable={false} />

        <Text style={styles.label}>Sex</Text>
        <TextInput style={styles.input} value="Female" editable={false} />

        <Text style={styles.label}>Birthday</Text>
        <TextInput style={styles.input} value="1995-06-15" editable={false} />

        <Text style={styles.label}>Place of Birth</Text>
        <TextInput
          style={styles.input}
          value="Naga City, Camarines Sur"
          editable={false}
        />
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} value="09171234567" editable={false} />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value="AnnaMarieS@yahoo.com"
          editable={false}
        />
        <Text style={styles.label}>Emergency Number</Text>
        <TextInput style={styles.input} value="09171234567" editable={false} />

        <Text style={styles.label}>Present Address</Text>
        <TextInput
          style={styles.input}
          value="123 Purok 4, Brgy. Abella, Naga City, Camarines Sur, Region V"
          editable={false}
        />

        <Text style={styles.label}>Civil Status</Text>
        <TextInput style={styles.input} value="Married" editable={false} />

        <Text style={styles.label}>Religion</Text>
        <TextInput style={styles.input} value="Catholic" editable={false} />

        <Text style={styles.label}>nationality</Text>
        <TextInput style={styles.input} value="Pilipino" editable={false} />

        <Text style={styles.label}>Monthly Family Income</Text>
        <TextInput
          style={styles.input}
          value="₱20,001 - ₱25,000"
          editable={false}
        />
      </View>

      <View style={styles.formContainer}>
        {/* EDUCATIONAL BACKGROUND */}
        <Text style={styles.sectionHeader}>Educational Background</Text>

        <Text style={styles.label}>
          Name of School (Highest Educational Attainment)
        </Text>
        <TextInput
          style={styles.input}
          value="Naga College Foundation"
          editable={false}
        />

        <Text style={styles.label}>College Degree</Text>
        <TextInput
          style={styles.input}
          value="Bachelor of Elementary Education"
          editable={false}
        />

        <Text style={styles.label}>Highest Educational Attainment</Text>
        <TextInput
          style={styles.input}
          value="College Graduate"
          editable={false}
        />

        <Text style={styles.label}>Year Graduated</Text>
        <TextInput style={styles.input} value="2018" editable={false} />

        <Text style={styles.label}>Eligibility (Selected Certificates)</Text>
        <TextInput
          style={styles.input}
          value="LET Passer, NC II Holder"
          editable={false}
        />
      </View>

      <View style={styles.formContainer}>
        {/* SPOUSE INFORMATION */}
        <Text style={styles.sectionHeader}>Spouse Information</Text>

        <Text style={styles.label}>Spouse Last Name</Text>
        <TextInput style={styles.input} value="Dela Cruz" editable={false} />

        <Text style={styles.label}>Spouse First Name</Text>
        <TextInput style={styles.input} value="Juan" editable={false} />

        <Text style={styles.label}>Spouse Middle Name</Text>
        <TextInput style={styles.input} value="Reyes" editable={false} />

        <Text style={styles.label}>Spouse Extension</Text>
        <TextInput style={styles.input} value="Jr." editable={false} />

        <Text style={styles.label}>Spouse Monthly Income</Text>
        <TextInput
          style={styles.input}
          value="₱10,000 - ₱20,000"
          editable={false}
        />

        <Text style={styles.label}>Spouse Occupation</Text>
        <TextInput style={styles.input} value="Driver" editable={false} />
      </View>

      <View style={styles.formContainer}>
        {/* CHILDREN INFORMATION */}
        <Text style={styles.sectionHeader}>Children</Text>

        <Text style={styles.label}>Child 1 - Last Name</Text>
        <TextInput style={styles.input} value="Dela Cruz" editable={false} />
        <Text style={styles.label}>Child 1 - First Name</Text>
        <TextInput style={styles.input} value="Maria" editable={false} />
        <Text style={styles.label}>Child 1 - Middle Name</Text>
        <TextInput style={styles.input} value="Santos" editable={false} />
        <Text style={styles.label}>Child 1 - Extension</Text>
        <TextInput style={styles.input} value="" editable={false} />

        <Text style={{ marginVertical: 10 }}></Text>

        <Text style={styles.label}>Child 2 - Last Name</Text>
        <TextInput style={styles.input} value="Dela Cruz" editable={false} />
        <Text style={styles.label}>Child 2 - First Name</Text>
        <TextInput style={styles.input} value="Jose" editable={false} />
        <Text style={styles.label}>Child 2 - Middle Name</Text>
        <TextInput style={styles.input} value="Reyes" editable={false} />
        <Text style={styles.label}>Child 2 - Extension</Text>
        <TextInput style={styles.input} value="III" editable={false} />
      </View>

      <View style={styles.formContainer}>
        {/* ASSIGNMENT INFORMATION */}
        <Text style={styles.sectionHeader}>Assignment Information</Text>

        <Text style={styles.label}>Assigned Educare Center</Text>
        <TextInput
          style={styles.input}
          value="Educare Center 1"
          editable={false}
        />

        <Text style={styles.label}>Barangay</Text>
        <TextInput style={styles.input} value="Abella" editable={false} />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value="Barangay Hall"
          editable={false}
        />

        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          value="City Social Welfare Development Office"
          editable={false}
        />

        <Text style={styles.label}>Employment Type</Text>
        <TextInput style={styles.input} value="Full-Time" editable={false} />

        <Text style={styles.label}>Employment Status</Text>
        <TextInput style={styles.input} value="Permanent" editable={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'white'
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  label: {
    fontWeight: '600',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
    backgroundColor: '#f0f0f0'
  }
});

export default ReviewForm;
