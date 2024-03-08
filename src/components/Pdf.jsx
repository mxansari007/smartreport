import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato' },
  section: { textAlign: 'center', margin: 30 }
});

const Pdf = () => (
  <PDFViewer>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.section, { color: 'white' }]}>
          <Text>Section #1</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default Pdf;