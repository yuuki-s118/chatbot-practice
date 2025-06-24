import sys
print(sys.executable)
import pandas as pd

# CSVファイルを読み込む
df = pd.read_csv('data.csv')

# データフレームの最初の5行を表示
print("データの最初の5行:")
print(df.head())

# 基本的な統計情報を表示
print("\n基本的な統計情報:")
print(df.describe())