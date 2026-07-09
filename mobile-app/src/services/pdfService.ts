import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const generateWorkoutPDF = async (athleteData: any, workoutData: any) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 20px; background-color: #0A0A0A; color: white; }
          .header { text-align: center; border-bottom: 2px solid #B026FF; padding-bottom: 10px; margin-bottom: 20px; }
          .logo { font-size: 32px; font-weight: bold; color: #B026FF; }
          .athlete-info { margin-bottom: 30px; }
          .title { color: #00E5FF; text-transform: uppercase; letter-spacing: 2px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #2B0038; color: #B026FF; padding: 12px; text-align: left; }
          td { padding: 12px; border-bottom: 1px solid #333; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">iRunner PLAN</div>
          <p>Assessoria Esportiva</p>
        </div>
        
        <div class="athlete-info">
          <h2 class="title">Prescrição de Treino</h2>
          <p><strong>Atleta:</strong> ${athleteData.name}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Exercício</th>
              <th>Séries</th>
              <th>Repetições</th>
              <th>Intensidade</th>
            </tr>
          </thead>
          <tbody>
            ${workoutData.map((item: any) => `
              <tr>
                <td>${item.exercise}</td>
                <td>${item.sets}</td>
                <td>${item.reps}</td>
                <td>${item.intensity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p>Gerado automaticamente pelo iRunner PLAN</p>
          <p>#VEMPRAIRUNNER</p>
        </div>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};
